<?php

namespace App\Http\Controllers;

use App\Http\Requests\loginRequest;
use App\Http\Requests\registerRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{


    public function register(registerRequest $request)
    {
        $data = $request->validated();

       $user = User::create(array(
            "name" => $data["name"],
            "email" => $data["email"],
            "username" => $data["username"],
            "password" => Hash::make($data["password"])
        ));

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'),200);

    }
    public function login(loginRequest $request)
    {
        $credentals = $request->validated();

        if (!Auth::attempt($credentals)) {

            return response(array(
                "message" => "E-posta veya parola hatalı"
            ), 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user','token'),200);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        $user->currentAccessToken()->delete();
    }
}
