import {Item} from "./item";
export {Item} from "./item";
import {Comment} from "./comment";
import DateTimeFormat = Intl.DateTimeFormat;
export {Comment} from "./comment";
import {Creator} from "./creator";
export {Creator} from "./creator";
import {Shopper} from "./shopper";
export {Shopper} from "./shopper";


export class Shoppinglist {
    constructor(
        public id: number,
        public name: string,
        public due_date: Date,
        public creator_id: number,
        public shopper_id?: number,
        public actual_price?: number,
        public items?: Item[],
        public comments?:Comment[],
        public creator?:Creator,
        public shopper?:Shopper
    ){

    }

}
