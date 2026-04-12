<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $userData = [
            [
                'uid'        => '019ccf4b-02f1-7b15-b2cf-6fdbfe8a12cb',
                'name'       => 'abcd 1324',
                'email'      => '123@1234.com',
                'password'   => password_hash('Ufd$RyEH~R-2;tq', PASSWORD_DEFAULT),
                'admin'      => 1,
            ],
            [
                'uid'        => '019ccf4b-226e-7a9a-8880-2d47f01decc8',
                'name'       => 'Test test',
                'email'      => 'test@test.test',
                'password'   => password_hash('Ufd$RyEH~R-2;tq', PASSWORD_DEFAULT),
                'admin'      => 0,
            ],
        ];

        $this->db->table('Users')->insertBatch($userData);
    }
}
