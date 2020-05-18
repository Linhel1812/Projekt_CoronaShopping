<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShoppinglistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shoppinglists', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->date('due_date')->nullable();

            $table->integer('creator_id')->unsigned()->index();
            $table->foreign('creator_id')->references('id')->on('users');
                //->onDelete('cascade');


            //$table->integer('creator_id')->unsigned();

            $table->integer('shopper_id')->nullable()->unsigned()->index();
            $table->foreign('shopper_id')->references('id')->on('users')
                ->onDelete('cascade');

            //(($table->integer('shopper_id')->unsigned()->nullable();

            $table->integer('actual_price')->nullable();
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
        Schema::dropIfExists('shoppinglists');
    }
}
