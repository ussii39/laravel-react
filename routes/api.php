<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['api', 'cors']], function(){
    
Route::get('/answer', 'App\Http\Controllers\TodoController@index');

Route::get('/questions', 'App\Http\Controllers\QuestionsController@getquestion');

Route::get('/question/python', 'App\Http\Controllers\QuestionsController@getpythonquestion');

Route::get('/notcompleted', 'App\Http\Controllers\QuestionsController@NotCompleted');

Route::get('/completed', 'App\Http\Controllers\QuestionsController@Completed');

Route::get('/random/question', 'App\Http\Controllers\QuestionsController@random');

Route::put('question/{id}', 'App\Http\Controllers\QuestionsController@put');

Route::post('answer', 'App\Http\Controllers\TodoController@store');

Route::put('setAnswerId/{id}', 'App\Http\Controllers\UserController@setUserIds');

Route::put('selectlang/setAnswerId/{id}', 'App\Http\Controllers\UserController@setUserId');

Route::put('answer/{id}', 'App\Http\Controllers\TodoController@put');

Route::post('/userpoint', 'App\Http\Controllers\UserController@point');

Route::post('/userpercent','App\Http\Controllers\UserController@store');

Route::get('/usersId', 'App\Http\Controllers\UserController@get');

Route::post('/users', 'App\Http\Controllers\UserController@getUser');

Route::get('/user',function (Request $request) {
	
	$users = User::all();

	return response()->json(['users' => $users]);

});
Route::get('/user/{user}', function(User $user){

	return response()->json(['user' => $user]);

});
Route::post("/login",function(){
    $email = request()->get("email");
    $password = request()->get("password");
    $user = User::where("email",$email)->first();
    if ($user && Hash::check($password, $user->password)) {
     $token = Str::random(10);
     $user->token = $token;
     $user->save();
     return [
      "token" => $token,
      "user" => $user
     ];
    }else{
     abort(401);
    }
   });

   Route::get("/mypage",function(){
    $token = request()->bearerToken();
    $user = User::where("token",$token)->first();
    if ($token && $user) {
     return [
      "user" => $user
     ];
    }else{
     abort(401);
    }
   });

   Route::post("/logout",function(){
    $token = request()->bearerToken();
    $user = User::where("token",$token)->first();
    if ($token && $user) {
     $user->token = '';
     $user->save();
     return [];
    }else{
     abort(401);
    }
   });
});