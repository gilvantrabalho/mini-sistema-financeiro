<?php

namespace App\Repositories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class TransactionRepository
{
    public static function getAllTransactionsByUser($type = "")
    {
        $transaction = Transaction::query();
        $transaction->where('user_id', Auth::user()->id);
        if ($type != '')
            $transaction->whereType($type);
        $query = $transaction->orderBy('date', 'DESC')->get();
        return $query;
    }

    public static function create($data): Transaction
    {
        return Transaction::create([
            'user_id' => Auth::user()->id,
            'type' => $data['type'],
            'description' => $data['description'],
            'value' => $data['value'],
            'date' => $data['date'],
        ]);
    }

    public static function update($transaction, $data): int
    {
        return Transaction::whereId($transaction->id)
            ->update([
                'user_id' => Auth::user()->id,
                'type' => $data['type'],
                'description' => $data['description'],
                'value' => $data['value'],
                'date' => $data['date'],
            ]);
    }
}
