<?php
use App\User;

/*
//welcome blade wird gezeigt firstname und lastname
Route::get('/', function (){
    $users = DB::table('users')->get();
    return view ('welcome', compact('users'));
});

//nur die users firstname wird gezeigt
Route::get('/users', function (){
    $users = User::all();
    return view ('users.index', compact('users'));

});
//show-blade.php gemacht was dann unter dem pfad ausgegeben wird
Route::get('/users/{id}', function ($id){
    $user = User::find($id);
    //$user = DB::table('users')->find($id);
    return view ('users.show', compact('user'));
    //return view ('welcome', compact('users'));
    //dd($user);
});
*/

Route::get('/', 'ShoppinglistController@index');
Route::get('/shoppinglists', 'ShoppinglistController@index');
Route::get('/shoppinglists/{shoppinglist}', 'ShoppinglistController@show');
