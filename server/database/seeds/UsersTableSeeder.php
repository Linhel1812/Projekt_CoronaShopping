<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new \App\User;
        $user->firstName = "James";
        $user->lastName = "Barnes";
        $user->email = "b.barnes@gmx.at";
        $user->password = bcrypt("secret123");
        $user->city = "Brooklyn";
        $user->plz ="50021";
        $user->street= "Backstreet 12";
        $user->role="Shopper";
        $user->save();

        $user2 = new \App\User;
        $user2->firstName = "Steve";
        $user2->lastName = "Rogers";
        $user2->email = "s.rogers@gmx.at";
        $user2->password = bcrypt("daybreak123");
        $user2->city = "Brooklyn";
        $user2->plz ="65004";
        $user2->street= "Towerstreet 23";
        $user2->role="Creator";
        $user2->save();

        $user3 = new \App\User;
        $user3->firstName = "John";
        $user3->lastName = "Baker";
        $user3->email = "j.baker@gmx.at";
        $user3->password = bcrypt("john123");
        $user3->city = "Linz";
        $user3->plz ="4040";
        $user3->street= "Lederergasse 4";
        $user3->role="Creator";
        $user3->save();

        $user4 = new \App\User;
        $user4->firstName = "Susan";
        $user4->lastName = "Brown";
        $user4->email = "s.brown@gmx.at";
        $user4->password = bcrypt("brown123");
        $user4->city = "Linz";
        $user4->plz ="4020";
        $user4->street= "Haupstraße 26";
        $user4->role="Shopper";
        $user4->save();


        /*DB::table('users')->insert([
            'firstName' => Str::random(100),
            'lastName' => Str::random(100),
            'email' => Str::random(100),
            'password' => Str::random(100),
            'city' => Str::random(100),
            'plz' => 4040,
            'street' => Str::random(100),
            'role' => 1,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")

        ]);*/
    }
}
