import  {Shoppinglist} from "./shoppinglist";

export class ShoppinglistFactory {

    /*static empty():Shoppinglist{
        return new Shoppinglist(null, '', new Date(), 0, 0, 0,
            [{id: 0, name: '', quantity: 0, max_price: 0}],
        [{id:0, text: '', user_id: 0, updated_at: new Date()}]);
    }*/

    static empty(): Shoppinglist { return new Shoppinglist(0, '', new Date(), 0, 0, 0,
        [{id: 0, name: '', quantity: 0, max_price: 0}],
        [{id: 0, text: '', user_id: 0, updated_at: new Date()}]); }

    static fromObject(rawShoppinglist:any):Shoppinglist{
        return new Shoppinglist(
            rawShoppinglist.id,
            rawShoppinglist.name,
            /*typeof (rawShoppinglist.due_date) === 'string' ?
                new Date(rawShoppinglist.due_date) : rawShoppinglist.due_date,*/
            rawShoppinglist.due_date,
            rawShoppinglist.creator_id,
            rawShoppinglist.shopper_id,
            rawShoppinglist.actual_price,
            rawShoppinglist.items,
            rawShoppinglist.comments,
        );
    }
}
