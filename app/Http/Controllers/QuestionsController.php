<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Questions;
use App\Models\User;
// use Illuminate\Support\Arr;

class QuestionsController extends Controller
{
    public function getquestion(){
      $data = Questions::all();
      return response($data);
    }

    public function NotCompleted(Request $request){

      $product = Questions::select(['question','id','completed','subjects'])->where('completed', 0)->get();
      return response()->json($product);
    }
    public function Completed(Request $request){

      $product = Questions::select(['question','id','completed','subjects'])->where('completed', 1)->get();
      return response()->json($product);
    }

    public function put(Request $request,$id){
      $question = Questions::find($id);
      $question->completed = $request->completed;
      $question->timestamps = false; 
      $question->save();
      return response($question);
    }

     public function random(Request $request){
       $question = Questions::inRandomOrder()->take(5)->get();

        // $user = User::find($id);
        // $d = $user->AnsweredIds;
        // $data = json_encode($d);
        // $flattened = Arr::flatten($data);
        // $question = Questions::select(['question','id','completed','subjects'])->where('id',$data)->get();
      return response($question);
  }
  public function getpythonquestion(Request $request){
    $product = Questions::inRandomOrder()->select(['question','id','completed','subjects'])->where('subjects', 'python')->take(4)->get();
    // $question = Questions::inRandomOrder()->take(4)->get();
      return response($product);
  }
}
