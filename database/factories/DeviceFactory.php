<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Device>
 */
class DeviceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "name" => "device-" . Str::random(8),
            "mac_address" => fake()->unique()->macAddress(),
            "token" => Str::random(32),
            "note" => "Lorem ipsum dolor sit amet",
            "cluster_id" => \App\Models\Cluster::factory()->create()->id
        ];
    }
}
