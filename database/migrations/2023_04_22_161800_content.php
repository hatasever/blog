<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('contents');
        Schema::create("contents", function(Blueprint $table){
            $table->increments('id');
            $table->string('title');
            $table->text('content');
            $table->integer('author');
            $table->json('like')->nullable();
            $table->json('comment')->nullable();
            $table->integer('published');
            $table->date('publish_date');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop('contents');
    }
};
