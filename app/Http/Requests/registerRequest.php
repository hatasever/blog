<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class registerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "name" => array("string","required","max:25"),
            "username" => array("unique:Users,username"),
            "password" => array("required","confirmed",Password::min(6)->symbols()->numbers()->letters()->mixedCase()),
            "email"    => array("email","required","unique:Users,email")
        ];
    }
}
