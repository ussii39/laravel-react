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
    public function setUserIds(Request $request,$id){
        $user = User::find($id);
        // User::where('AnsweredIds', "null")->delete();
        $user->AnsweredIds = $request->AnsweredIds;
        $user->timestamps = false; 
        //   $rules = ['AnsweredIds' => 'required|AnsweredIds|unique:user,AnsweredIds'];
        // User::where('id', $id)->update(['user->AnsweredIds' => '']);
        //   $this->validate($request, $rules);
          $user->save();
    }
    public function get(Request $request){
      $userId = User::select('AnsweredIds')->get();

        return response($userId);
    }
}
