<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    public function index(){
        $answer = Todo::all();
 
        return response($answer);
    }    
 
    public function store(Request $request){
       $answer = $request->answer;
 
 
       $answerData = Todo::where("answer",$answer)->get();
       if ($answerData){
          return response($answerData);
      }else{
          return response($request);
      }
    }
    public function put(Request $request,$id){
 
         $todo = Todo::find($id);
         $todo->completed = $request->completed;
         $todo->timestamps = false; 
         $todo->save();
         return response($todo);
 }
 }
