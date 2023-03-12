<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cluster extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'note', 'user_id'];
    protected $hidden = ['user_id', 'created_at', 'updated_at'];

    public function devices()
    {
        return $this->hasMany(Device::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
