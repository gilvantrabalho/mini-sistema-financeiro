<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    public function store(UserRequest $userRequest): JsonResponse
    {
        try {
            UserRepository::create($userRequest->validated());
            return response()->json([
                'success' => true,
                'message' => 'Usuário cadastrado com sucesso!'
            ], 201);
        } catch (\Exception $e) {
            Log::error('Erro ao criar usuário: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erro ao cadastrar o usuário, tente novamente mais tarde.'
            ], 500);
        }
    }
}
