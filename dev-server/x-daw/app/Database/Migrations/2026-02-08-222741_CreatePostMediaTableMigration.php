<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreatePostMediaTableMigration extends Migration
{
    public function up()
    {
        $this->forge->addField([
            "id" => [
                'type' => 'BIGINT',
                'constraint' => 36,
                'unsigned' => true,
                'null' => false,
                'auto_increment' => true,
            ],
            'post_id' => [
                'type' => 'VARCHAR',
                'constraint' => 36,
                'null' => false,
            ],
            'media_url' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false,
            ],
            'type' => [
                'type' => 'VARCHAR',
                'constraint' => 128,
                'null' => false,
            ]
        ]);

        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('post_id', 'Posts', 'id', '', 'CASCADE');
        $this->forge->createTable('Media');

    }

    public function down()
    {
        $this->forge->dropTable('Media');
    }
}
