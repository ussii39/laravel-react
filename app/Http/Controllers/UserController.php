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
        $user->save();
        $message = ["正解です"];
        return  response($message);
        //   $rules = ['AnsweredIds' => 'required|AnsweredIds|unique:user,AnsweredIds'];
        // User::where('id', $id)->update(['user->AnsweredIds' => '']);
        //   $this->validate($request, $rules);
    }

    public function get(Request $request){
      $userId = User::select('AnsweredIds')->get();

        return response($userId);
    }
    public function point(Request $request){
      
      $id = $request->id;
      $user = User::find($id);
      $user->point = $request->point;
      $user->timestamps = false; 
      $user->save();
      return response($user);

    }
    public function setUserId(Request $request,$id){
      $user = User::find($id);
      // User::where('AnsweredIds', "null")->delete();
      $user->AnsweredIds = $request->AnsweredIds;
      $user->timestamps = false; 
      $user->save();
      $message = ["正解です"];
      return  response($message); 
    }
    public function getUser(Request $request){

      $token = $request->token;
      $getUserData = User::where("token",$token)->get();
      return  response($getUserData);
    }
}
