<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comment extends Model
{
    protected $fillable = [
        'text', 'shoppinglist_id', 'user_id'
    ];

    public function shoppinglist() : BelongsTo {
        return $this->belongsTo(Shoppinglist::class);
    }

    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }



}
