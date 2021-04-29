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
    
    public function getAnswer(Request $request,$id){
        $todo = Todo::find($id);
        $todo->timestamps = false;
 
        return response($todo);
    }    
 
    public function store(Request $request){
       $answer = $request->answer;
       $answerData = Todo::where("answer",$answer)->get();
       $array = json_decode(json_encode($answerData), true);
       if ($answerData){
          return response($array);
      }else{
          return response($Answers);
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
