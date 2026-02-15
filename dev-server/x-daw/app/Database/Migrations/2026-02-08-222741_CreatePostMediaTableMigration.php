<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreatePostMediaTableMigration extends Migration
{
    public function up()
    {
        $this->forge->addField([
            "id" => [
                'type' => 'VARCHAR',
                'constraint' => 36,
                'null' => false,
            ],
            'media' => [
                'type' => 'LONGBLOB',
                'null' => false,
            ],
            'type' => [
                'type' => 'VARCHAR',
                'constraint' => 128,
                'null' => false,
            ],
            'mime' => [
                'type' => 'VARCHAR',
                'constraint' => 128,
                'null' => false,
            ],
            'post_id' => [
                'type' => 'VARCHAR',
                'constraint' => 36,
                'null' => false,
            ],
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
