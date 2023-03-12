<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('current_temperatures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('device_id')->nullable();
            $table->integer('user_id')->nullable();
            $table->enum('status', ['offline', 'online'])->default('offline');
            $table->string('temperature')->nullable();
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
        Schema::dropIfExists('current_temperatures');
    }
};
