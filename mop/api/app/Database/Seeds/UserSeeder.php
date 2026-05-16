<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'id'       => \App\Infrastructure\Helpers\TokenGenerator::generate(),
            'username' => 'admin',
            'password' => password_hash('admin', PASSWORD_DEFAULT)
        ];

        $this->db->table('Users')->insert($data);
    }
}
