<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'token', 'cluster_id', 'note'];
    protected $hidden = ['id', 'token', 'note', 'cluster_id', 'created_at', 'updated_at'];

    public function cluster()
    {
        return $this->belongsTo(Cluster::class);
    }
    public function currentTemperature()
    {
        return $this->hasOne(CurrentTemperature::class);
    }
}
