<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group( function(){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::POST('/logout', [AuthController::class, 'logout']);

    Route::apiResource('/users', \App\Http\Controllers\Api\userController::class);
    Route::apiResource('/contents', \App\Http\Controllers\Api\contentController::class);
    Route::POST('/contents/remove', [\App\Http\Controllers\Api\contentController::class, "deleteComment"] );
    Route::POST('/contents/addComment', [\App\Http\Controllers\Api\contentController::class, "addComment"] );
    Route::GET('/mycontent', [\App\Http\Controllers\Api\contentController::class, "myContent"] );
});


Route::POST('/register', [AuthController::class, 'register']);
Route::POST('/login', [AuthController::class, 'login']);
