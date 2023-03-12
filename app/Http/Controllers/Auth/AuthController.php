<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login()
    {
        return inertia('Auth/Login');
    }

    public function loginStore(Request $request)
    {
        $this->validate($request, [
            'email'     => 'required|email',
            'password'  => 'required'
        ]);
        $credentials = $request->only('email', 'password');
        if (Auth::validate($credentials)) {
            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();
                return redirect()->intended(RouteServiceProvider::HOME);
            }
        }
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function Register(Request $request)
    {
        return inertia('Auth/Register');
    }

    public function RegisterStore(Request $request)
    {
        $this->validate($request, ["name" => "required", "email" => "required|email|
        unique:users", "password" => "required|confirmed"]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        return redirect('/login')->with('status', "Register Success");
    }

    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
