<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shoppinglist extends Model
{
    protected $fillable = [
        'name', 'due_date', 'creator_id', 'shopper_id', 'actual_price'
    ];


    //shoppinglist assigned
    public function creator() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function shopper() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function comments() : HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function items() : HasMany
    {
        return $this->hasMany(Item::class);
    }


    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }
}
