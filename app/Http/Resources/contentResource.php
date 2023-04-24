<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class contentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    //public static $wrap = false;
     public function toArray(Request $request): array
    {
        return array(
            "id" => $this->id,
            "title" => $this->title,
            "content" => $this->content,
            "author" => $this->authorSelf,
            "file"  => $this->file,
            "like" => $this->like,
            "publish_date" => $this->publish_date,
            "published" => $this->published,
            "comments" => $this->Comments,

        );
    }
}
