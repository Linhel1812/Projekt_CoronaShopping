<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShoppinglistItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shoppinglist_item', function (Blueprint $table) {

            $table->integer('shoppinglist_id')->unsigned()->index();
            $table->foreign('shoppinglist_id')->references('id')
                ->on('shoppinglists')->onDelete('cascade');

            $table->integer('item_id')->unsigned()->index();
            $table->foreign('item_id')->references('id')
                ->on('items')->onDelete('cascade');

            $table->primary(['shoppinglist_id','item_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shoppinglist_item');
    }
}
