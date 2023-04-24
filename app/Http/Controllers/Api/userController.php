<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\userResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        return  userResource::collection( User::query()->orderBy('id', 'desc')->where("id","!=",auth()->user()->id)->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
             $data = $request -> validated();

             $data["password"] = Hash::make($data["password"]);

        return response(new userResource($data), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new userResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {

        if (auth()->user()->role > 1) {

        $data = $request->validated();
            if (isset($data["password"])) {
                $data["password"] = Hash::make($data["password"]);
            }
        $user->unguard(true);
        $user->update($data);
        return new userResource($user);

            }
            else
            {
                return response(array(
                   "error" => array("permition_error" => "Bu alana erişim yetkiniz bulunmuyor.")
                ), 403);
            }
    }

    /*
     * Remove the specified resource from storage.
     */

    public function destroy(User $user)
    {
        if (auth()->user()->role > 1) {

            return response(array(
                "error" => array("permition_denied" => "Bu alana erişim yetkiniz bulunmuyor.")
            ) , 403);

        }
        $user->delete();
        return response("", 204);
    }
}
