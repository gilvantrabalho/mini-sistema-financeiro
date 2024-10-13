<?php

namespace App\Http\Controllers\Api;

use App\Enum\TransactionEnum;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $userId = Auth::user()->id;

        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        $totalOut = Transaction::whereUserId($userId)
            ->whereType(TransactionEnum::SAIDA->value)
            ->whereMonth('date', $currentMonth)
            ->whereYear('date', $currentYear)
            ->sum('value');

        $totalEntry = Transaction::whereUserId($userId)
            ->whereType(TransactionEnum::ENTRADA->value)
            ->whereMonth('date', $currentMonth)
            ->whereYear('date', $currentYear)
            ->sum('value');

        $total = $totalEntry - $totalOut;

        $orderDirection = request()->get('order', 'asc');
        $validOrderDirections = ['asc', 'desc'];

        if (!in_array($orderDirection, $validOrderDirections))
            $orderDirection = 'asc';

        $transactions = Transaction::whereUserId($userId)
            ->selectRaw(
                'YEAR(date) as year, MONTH(date) as month, 
            SUM(CASE WHEN type = ? THEN value ELSE 0 END) as totalEntry, 
            SUM(CASE WHEN type = ? THEN value ELSE 0 END) as totalOut',
                [TransactionEnum::ENTRADA->value, TransactionEnum::SAIDA->value]
            )
            ->groupBy('year', 'month')
            ->orderBy('year', $orderDirection)
            ->orderBy('month', $orderDirection)
            ->get();

        $labels = [];
        $differences = [];

        Carbon::setLocale('pt_BR');

        foreach ($transactions as $transaction) {
            $labels[] = Carbon::create($transaction->year, $transaction->month)->translatedFormat('F Y');
            $difference = $transaction->totalEntry - $transaction->totalOut;
            $differences[] = $difference;
        }

        return response()->json([
            'success' => true,
            'totalEntry' => $totalEntry,
            'totalOut' => $totalOut,
            'total' => $total,
            'labels' => $labels,
            'differences' => $differences
        ], 200);
    }
}
