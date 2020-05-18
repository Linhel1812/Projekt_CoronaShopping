<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;

use App\Shoppinglist;
use App\Item;
use App\Comment;
use App\User;

class ShoppinglistController extends Controller
{
    /*public function index(){
        $shoppinglists = Shoppinglist::all();
        return view ('shoppinglists.index', compact('shoppinglists'));
    }

    public function show($shoppinglist){
        $shoppinglist = Shoppinglist::find($shoppinglist);
        return view('shoppinglists.show', compact('shoppinglist'));
    }
    */
    public function index(){
        /*$shoppinglists = Shoppinglist::all();
        return $shoppinglists;*/
        $shoppinglists = Shoppinglist::with(['creator', 'shopper', 'comments', 'items'])->get();
        return $shoppinglists;
    }

    public function findByID(string $id) : Shoppinglist{
        $shoppinglist = Shoppinglist::where('id', $id)->with(['creator', 'shopper', 'comments', 'items'])->first();
        return $shoppinglist;
    }

    public function checkID(string $id){
        $shoppinglist = Shoppinglist::where('id',$id)->first();
        return $shoppinglist != null ? response()->json('list with '.$id.' exists',200) :
            response()->json('list with '.$id.' does not exist',404);
    }

    public function findBySearchTerm(string $searchTerm){
        $shoppinglist = Shoppinglist::with(['creator', 'shopper', 'comments', 'items'])
            ->where('name', 'LIKE', '%'.$searchTerm.'%')->get();
        return $shoppinglist;
    }

    //create a new shoppinglist

    public function save (Request $request):JsonResponse{
        $request = $this->parseRequest($request);
        DB::beginTransaction();

        try{
            $shoppinglist = Shoppinglist::create($request->all());
            //save items
            if(isset($request['items']) && is_array($request['items'])){
                foreach($request['items'] as $ite){
                    //$item = Item::firstOrNew(['name'=>$ite['name'],'quantity'=>$ite['quantity'], 'max_price'=>$ite['max_price']]);
                    $item = new \App\Item;
                    $item->name = $ite['name'];
                    $item->quantity = $ite['quantity'];
                    $item->max_price = $ite['max_price'];
                    $shoppinglist->items()->save($item);
                }
            }

            //save creator
            if(isset($request['creator']) && is_array($request['creator'])){
                foreach($request['creator'] as $cre){
                    $creator = User::firstOrNew(['firstName'=>$cre['firstName'],
                        'lastName'=>$cre['lastName'], 'email'=>$cre['email'], 'password'=>$cre['password'],
                        'city'=>$cre['city'], 'plz'=>$cre['plz'], 'street'=>$cre['street']]);
                    $shoppinglist->creator()->save($creator);
                }
            }

            //save comment
            if(isset($request['comments']) && is_array($request['comments'])){
                foreach($request['comments'] as $com){
                    //$item = Item::firstOrNew(['name'=>$ite['name'],'quantity'=>$ite['quantity'], 'max_price'=>$ite['max_price']]);
                    //$comment = new \App\Comment;
                    //$comment->text = $com['text'];
                    $comment = Comment::firstOrNew(['text'=>$com['text']]);
                    //$comment->user_id = $com['user_id'];
                    $shoppinglist->comments()->save($comment);
                }
            }


            DB::commit();
            return response()->json($shoppinglist,201);
        } catch (\Exception $e){
            DB::rollback();
            return response()->json("saving shoppinglist failed: ".$e->getMessage(),420);
        }
    }

    //update
    public function update(Request $request, string $shoppinglistID) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $shoppinglist = Shoppinglist::with(['creator', 'shopper', 'comments', 'items'])
                ->where('id', $shoppinglistID)->first();
            if ($shoppinglist != null) {
                $request = $this->parseRequest($request);
                $shoppinglist->update($request->all());

                //delete all old items
                $shoppinglist->items()->delete();
                $shoppinglist->comments()->delete();


                // save items
                if (isset($request['items']) && is_array($request['items'])) {
                    foreach ($request['items'] as $ite) {
                        $item = Item::firstOrNew(['name'=>$ite['name'],'quantity'=>$ite['quantity'], 'max_price'=>$ite['max_price']]);
                        $shoppinglist->items()->save($item);
                    }
                }

                //save comments
                if (isset($request['comments']) && is_array($request['comments'])) {
                    foreach ($request['comments'] as $com) {
                        $comment = Comment::firstOrNew(['text'=>$com['text']]);
                        $shoppinglist->comments()->save($comment);
                    }
                }


                /*/update shopper
                $ids = [];
                if (isset($request['shopper']) && is_array($request['shopper'])) {
                    foreach ($request['shopper'] as $shop) {
                        array_push($ids,$shop['id']);
                    }
                }*/

                //update shopper
                if(isset($request['shopper']) && is_array($request['shopper'])){
                    foreach($request['shopper'] as $sho){
                        $shopper = User::firstOrNew(['firstName'=>$sho['firstName'],
                            'lastName'=>$sho['lastName'], 'email'=>$sho['email'], 'password'=>$sho['password'],
                            'city'=>$sho['city'], 'plz'=>$sho['plz'], 'street'=>$sho['street']]);
                        $shoppinglist->shopper()->save($shopper);
                    }
                }




                //$shoppinglist->shopper()->sync($ids);
                $shoppinglist->save();

            }
            DB::commit();
            $shoppinglist1 = Shoppinglist::with(['creator', 'shopper', 'comments', 'items'])
                ->where('id', $shoppinglistID)->first();

            // return a valid http response
            return response()->json($shoppinglist1, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating shoppinglist failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(string $shoppinglistID) : JsonResponse
    {
        $shoppinglist = Shoppinglist::where('id', $shoppinglistID)->first();
        if ($shoppinglist != null) {
            $shoppinglist->delete();
        }
        else
            throw new \Exception("shoppinglist couldn't be deleted - it does not exist");
        return response()->json('shoppinglist (' . $shoppinglist . ') successfully deleted', 200);

    }


    private function parseRequest(Request $request):Request {
        //get date and convert it - ISO 8601, e.g., "2020-01-01T21:00:00.000Z"
        $date = new \DateTime($request->published);
        $request['published'] = $date;
        return $request;
    }



}