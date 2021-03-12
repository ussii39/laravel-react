<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function store(Request $request){

        $id = $request->id;
        $user = User::find($id);
        $user->percent = $request->percent;
        $user->timestamps = false; 
        $user->save();

        return response($user);
    }
}
