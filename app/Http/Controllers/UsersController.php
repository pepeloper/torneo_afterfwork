<?php

namespace App\Http\Controllers;

use App\Models\Squad;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index(Request $request, Squad $squad) {
        $squad->load('users');

        return Inertia::render('Users/Index', [
            'squad' => $squad,
        ]);
    }
}
