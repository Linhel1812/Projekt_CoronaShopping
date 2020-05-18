<?php

use Illuminate\Database\Seeder;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $item = new \App\Item;
        $item->shoppinglist_id = 1;
        $item->name = "Eier";
        $item->quantity = 10;
        $item->max_price = 5;
        $item->save();


        $item2 = new \App\Item;
        $item2->shoppinglist_id = 1;
        $item2->name = "Milch";
        $item2->quantity = 11;
        $item2->max_price = 4;

        $item2->save();

    }
}
