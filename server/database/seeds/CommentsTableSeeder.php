<?php

use Illuminate\Database\Seeder;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $comment = new \App\Comment;
        $comment->text = "Das ist ein Kommentar";

        $shoppinglist_id = App\Shoppinglist::all()->first();
        $comment->shoppinglist()->associate($shoppinglist_id);
        $comment->save();

        $user_id = App\User::all()->first();
        $comment->user()->associate($user_id);
        $comment->save();
    }
}
