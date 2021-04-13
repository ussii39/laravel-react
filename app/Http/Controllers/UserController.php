<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;

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
      
    public function LoginStatus(Request $request){
    $token = $request->token;
    $getUserData = User::where("token",$token)->first();
    $getUserData->timestamps = false;
    $getUserData->LoginDate = $request->LoginDate;
    $getUserData->save();
     return response($getUserData);
   }

    public function getUser(Request $request){
      $token = $request->token;
      $getUserData = User::where("token",$token)->get();
      return  response($getUserData);
    }

    public function register(Request $request){

    $email = $request->email;
    $check = User::where("email",$email)->first(); 
      if(!$check){
        $token = Str::random(20);
        $user = User::create([
          'name' => $request->name,
          'email' => $request->email,
          'password' => bcrypt($request->password),
          'percent' => 0,
          'AnsweredIds' =>"[[null]]",
          'point' => 0,
          'LoginStatus' =>"[[null]]",
          'token' => $token
          ]);
          $user->save();
          return  response($user);
        }else{
          return response("既に登録されています");
        }
    }

    public function logout(Request $request){
      $token =  $request->token;
      $user = User::where("token",$token)->first();
      if ($token && $user) {
       $user->token = '';
       $user->save();
       return response($user);
      }else{
       abort(401);
      }
    }
}
