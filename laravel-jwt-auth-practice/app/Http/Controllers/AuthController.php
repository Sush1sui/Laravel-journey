<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $req)
    {
        $req->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed'
        ]);

        $user = User::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => Hash::make($req->password)
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(
            [
                'user' => $user,
                'token' => $token
            ],
            201
        );
    }


    public function login(Request $req)
    {
        $credentials = $req->only('email', 'password');

        if (!$token = Auth::attempt($credentials))
            return response()->json(['error' => 'Invalid credentials'], 401);

        return response()->json(['token' => $token]);
    }


    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }


    // Get authenticated user
    public function me()
    {
        return response()->json(Auth::user());
    }
}
