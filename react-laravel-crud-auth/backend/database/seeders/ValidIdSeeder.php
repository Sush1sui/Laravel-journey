<?php

namespace Database\Seeders;

use App\Models\Valid_IDs;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ValidIdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Generate 10 random entries with type 'T' or 'S' and unique custom IDs
        for ($i = 0; $i < 10; $i++) {
            Valid_IDs::create([
                'id' => $this->generateCustomId(),
                'user_type' => ['T', 'S'][array_rand(['T', 'S'])],
            ]);
        }
    }

    /**
     * Generate a unique, random numeric ID.
     */
    private function generateCustomId(): int
    {
        // Generate a random 10-digit number
        return random_int(1000000000, 9999999999);
    }
}
