<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Questions;

class QuestionsController extends Controller
{
    public function getquestion(){
      $data = Questions::all();
      return response($data);
    }

    public function NotCompleted(Request $request){

      $product = Questions::select(['question','id','completed'])->where('completed', 0)->get();
      return response()->json($product);
    }

    public function put(Request $request,$id){
      $question = Questions::find($id);
      $question->completed = $request->completed;
      $question->timestamps = false; 
      $question->save();
      return response($question);
    }
}
