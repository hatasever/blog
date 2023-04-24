<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorecontentsRequest;
use App\Http\Requests\UpdatecontentsRequest;
use App\Http\Resources\contentResource;
use App\Models\comments;
use App\Models\contents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class contentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return   contentResource::collection( contents::query()->orWhere(function($query){

            $query->where('published',0)->where("publish_date", '<=' , date('Y-m-d'));

        })->orWhere('published',1)->orderBy('publish_date', 'desc')->with('authorSelf')->paginate(9));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorecontentsRequest $request)
    {
        $data = $request->validated();

        $cont = $request->validated();



        $original_name = strtolower(str_replace(' ','_',$cont["file"]->getClientOriginalName()));


        $ext = explode('.',$original_name);


        $file_name = time().rand(100,999).'.'.$ext[count($ext) - 1];


        Storage::putFileAs(
            'uploads/' , $cont["file"],  $file_name
          );

          $cont["file"] =  'public/uploads/' . $file_name;
          $cont["author"] = auth()->user()->id;
          if ($cont["published"]) {
             $cont["publish_date"] = date('Y-m-d H:i:s');
          }


       $a = contents::Create($cont);

        return response(new contentResource($a));
    }

    /**
     * Display the specified resource.
     */
    public function show( contents $content)
    {
        return new contentResource($content);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecontentsRequest $request, contents $contents)
    {
        if (auth()->user()->id == $contents->id || auth()->user()->role > 1) {

            $cont = $request->validated();

            $original_name = strtolower(str_replace(' ','_',$cont["file"]->getClientOriginalName()));


            $ext = explode('.',$original_name);


            $file_name = time().rand(100,999).'.'.$ext[count($ext) - 1];


            Storage::putFileAs(
                'uploads/' , $cont["file"],  $file_name
              );

              $cont["file"] =  'uploads/' . $file_name;

            $contents->update($cont);
            return new contentResource($contents);

        }
        else
        {
           return response( array(
               "error" => array("permition_denied" => "Bu alana erişim yetkiniz bulunmuyor.")
           ) ,403);
        }

    }

    public function deleteComment(Request $request)
    {
        $valid = Validator::make($request->all(),array(
            "commentID" => ["required","Integer"],
            "contentID" => ["required","integer"]
        ));

        if ($valid->fails()) {
            return Response(array(
                "errors" => $valid->getMessageBag()->toArray()
            ));
        }

         $comn =  comments::where("id", $request->commentID)->first();

         if (auth()->user()->id == $comn->author || auth()->user()->role > 1) {
            $content = contents::where('id', $request->contentID)->first();

            $com = json_decode($content->comment);

            unset($com[array_search($request->commentID, $com)]);

            $com = array_values($com);
            $content->comment = json_encode($com);
            $content->save();

            return $content;
         }
         else
         {
            return response( array(
                "error" => array("permition_denied" => "Bu alana erişim yetkiniz bulunmuyor.")
            ) ,403);
         }


    }

    public function addComment(Request $request)
    {

        $valid = Validator::make($request->all(),array(
            "comment" => ["required","string"],
            "contentID" => ["required","integer"]
        ));

        if ($valid->fails()) {
            return Response(array(
                "errors" => $valid->getMessageBag()->toArray()
            ));
        }

        comments::unguard();
         $comment =  comments::create(array(
            "comment" => $request->comment,
            "row"     => $request->contentID,
            "author"  => auth()->user()->id
        ));


        $content = contents::where('id', $request->contentID)->first();

        $com = json_decode($content->comment);

        array_push($com,$comment->id);

        $com = array_values($com);
        $content->comment = json_encode($com);
        $content->save();

        return response($comment, 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(contents $contents)
    {
        if (auth()->user()->role > 1) {
            $contents->delete();

            return response('', 204);
        }
        else
        {
            return response(array(
                "error" => array("permition_error" => "Bu alana erişim yetkiniz bulunmuyor.")
            ) ,403);
        }

    }
}
