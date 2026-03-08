<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run()
    {
        $postData = [
            [
                'id'        => '019ccf4d-c502-7a41-9952-8896a7394a6d',
                'user_id'   => '019ccf4b-02f1-7b15-b2cf-6fdbfe8a12cb',
                'title'     => 'hello world!',
                'text'      => 'first post',
                'is_public' => 1,
                'parent_id' => null,
                'likes'     => 0,
            ],
            [
                'id'        => '019ccf4d-f9d3-7638-b9bb-b44a8b280207',
                'user_id'   => '019ccf4b-226e-7a9a-8880-2d47f01decc8',
                'title'     => 'abcd134342',
                'text'      => 'dsfjaskdlfjdskl',
                'is_public' => 1,
                'parent_id' => null,
                'likes'     => 0,
            ],
        ];

        $this->db->table('Posts')->insertBatch($postData);

        $commentData = [
            [
                'id'        => '019ccf4e-3a6e-76ec-9adb-5fa8c1ebf585',
                'user_id'   => '019ccf4b-02f1-7b15-b2cf-6fdbfe8a12cb',
                'title'     => 'test test test test',
                'text'      => 'test test test test',
                'is_public' => 1,
                'parent_id' => '019ccf4d-f9d3-7638-b9bb-b44a8b280207',
                'likes'     => 0,
            ],
        ];

        $this->db->table('Posts')->insertBatch($commentData);
    }
}
