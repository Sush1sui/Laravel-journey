<?php

namespace Database\Seeders;

use App\Models\Teacher;
use App\Models\User;
use App\Models\Valid_IDs;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ValidIdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin_initialized = false;
        // Generate 10 random entries with type 'T' or 'S' and unique custom IDs
        for ($i = 0; $i < 10; $i++) {
            $valid_id = Valid_IDs::create([
                'id' => $this->generateCustomId(),
                'user_type' => ['T', 'S'][array_rand(['T', 'S'])],
            ]);

            if ($valid_id->user_type === "T" && !$admin_initialized) {
                User::create([
                    'id' => $valid_id->id,
                    'email' => "sirjm@gmail.com",
                    'user_type' => "T",
                    'password' => Hash::make("12345678")
                ]);
                Teacher::create([
                    'id' => $valid_id->id,
                    'fn' => "John Mark",
                    'ln' => "Policarpio",
                    'email' => "sirjm@gmail.com",
                    'isAdmin' => true,
                    'subjects' => []
                ]);
                $admin_initialized = true;
            }
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
