<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TransactionRequest;
use App\Models\Transaction;
use App\Repositories\TransactionRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
    public function show(Transaction $transaction): JsonResponse
    {
        return response()->json([
            'success' => true,
            'transaction' => $transaction
        ]);
    }

    public function read(Request $request): JsonResponse
    {
        $type = $request->get('type') ?? null;
        return response()->json([
            'success' => true,
            'transactions' => TransactionRepository::getAllTransactionsByUser($type)
        ]);
    }

    public function store(TransactionRequest $transactionRequest): JsonResponse
    {
        try {
            TransactionRepository::create($transactionRequest->validated());
            return response()->json([
                'success' => true,
                'message' => 'Transação cadastrada com sucesso!'
            ], 201);
        } catch (\Exception $e) {
            Log::error('Erro ao criar transação: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar transação, tente novamente mais tarde.'
            ], 500);
        }
    }

    public function update(Transaction $transaction, TransactionRequest $transactionRequest)
    {
        try {
            TransactionRepository::update($transaction, $transactionRequest->validated());
            return response()->json([
                'success' => true,
                'message' => 'Transação editada com sucesso!'
            ], 201);
        } catch (\Exception $e) {
            Log::error('Erro ao criar transação: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar transação, tente novamente mais tarde.'
            ], 500);
        }
    }

    public function destroy(Transaction $transaction): JsonResponse
    {
        $transaction->delete();
        return response()->json([
            'success' => true,
            'message' => 'Transação deletada com sucesso'
        ]);
    }
}
