<?php

use Illuminate\Database\Seeder;

class ShoppinglistsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $shoppinglist = new \App\Shoppinglist;
        $shoppinglist->name = "Steve's Einkaufsliste";
        $shoppinglist->due_date = new DateTime();

        $creator_id = App\User::all()->first();
        $shoppinglist->creator()->associate($creator_id);
        $shoppinglist->save();

        //$shoppinglist->creator_id = 1;

        $shopper_id = App\User::all()->first();
        $shoppinglist->shopper()->associate($shopper_id);
        $shoppinglist->save();

        //$shoppinglist->shopper_id = 12;
        $shoppinglist->actual_price = 100;


    }
}
