<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class contents extends Model
{
    use HasFactory;

    protected $table = "contents";
    protected $guarded = [];
    protected $append = array("Comments");

    public function authorSelf()
    {
        return $this->hasOne(User::class, 'id', 'author');
    }
    public function getCommentsAttribute()
    {
        if ($this->comment) {
            return comments::whereIn("id",json_decode($this->comment))->with("author")->get();
        }

    }
}
