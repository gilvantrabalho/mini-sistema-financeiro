<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        try {

            $credentials = $request->only('email', 'password');

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'E-mail e/ou senha incorreto!'
                ], 401);
            }

            return response()->json([
                'token' => $token,
                'user' => Auth::user()->id
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao tentar logar usuário: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erro ao tentar logar o usuário, tente novamente mais tarde.'
            ], 500);
        }
    }
}
