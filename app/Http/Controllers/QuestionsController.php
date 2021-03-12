<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Questions;

class QuestionsController extends Controller
{
    public function index(){
      $data = Questions::all();
      return response($data,200);
    }
}
