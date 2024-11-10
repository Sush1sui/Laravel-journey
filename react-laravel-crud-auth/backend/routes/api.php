<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('tasks', TaskController::class);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $req) {
        $user = $req->user();
        $user_creds = $user->user_type === 'S'
            ? Student::where('id', $user->id)->first()
            : ($user->user_type === 'T'
                ? Teacher::where('id', $user->id)->first()
                : null);

        if (!$user_creds) return response()->json(['error' => 'Unauthorized'], 400);

        return [
            'user' => $user,
            'user_creds' => $user_creds
        ];
    });
    Route::post('logout', [AuthController::class, 'logout']);
});
