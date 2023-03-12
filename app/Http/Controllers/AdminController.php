<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    public function index()
    {

        $users = User::withCount(['clusters', 'devices'])->get();
        $usersPaginate = User::withCount(['clusters', 'devices'])->paginate(5);
        return inertia('Dashboard/Admin/Admin', ['users' => $users, 'usersPaginate' => $usersPaginate]);
    }
}
