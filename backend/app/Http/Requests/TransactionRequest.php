<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'type' => 'required|in:0,1',
            'description' => 'required|string|max:255',
            'value' => 'required|numeric|min:0',
            'date' => 'required|date',
        ];
    }

    public function messages()
    {
        return [
            'type.required' => 'O tipo de transação é obrigatório.',
            'type.in' => 'O tipo de transação deve ser 0 (saída) ou 1 (entrada).',
            'description.required' => 'A descrição é obrigatória.',
            'description.string' => 'A descrição deve ser uma string.',
            'description.max' => 'A descrição não pode ter mais de 255 caracteres.',
            'value.required' => 'O valor é obrigatório.',
            'value.numeric' => 'O valor deve ser um número.',
            'value.min' => 'O valor deve ser pelo menos 0.',
            'date.required' => 'A data é obrigatória.',
            'date.date' => 'A data deve ser uma data válida.',
        ];
    }
}
