<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CurrentTemperature>
 */
class CurrentTemperatureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "device_id" => \App\Models\Device::factory()->create()->id,
            "status" => "offline",
            "temperature" => null,
        ];
    }
}
