<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;
use CodeIgniter\Database\RawSql;

class CreatePostsTableMigration extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'user_id' => [
                'type' => 'VARCHAR',
                'constraint' => 128,
                'null' => false,
            ],
            "id" => [
                'type' => 'VARCHAR',
                'constraint' => 36,
                'null' => false,
            ],
            "title" => [
                'type' => 'VARCHAR',
                'constraint' => 200,
                'null' => false
            ],
            "text" => [
                'type' => 'TEXT',
                'null' => false,
            ],
            "is_public" => [
                'type' => 'BOOLEAN',
                'null' => false,
                'default' => true,
            ],
            "created_at" => [
                'type' => 'TIMESTAMP',
                'null' => false,
                'default' => new RawSql('CURRENT_TIMESTAMP'),
            ],
            "deleted_at" => [
                'type' => 'TIMESTAMP',
                'null' => true,
            ],
            "parent_id" => [
                'type' => 'VARCHAR',
                'constraint' => '36',
                'null' => true,
                'default' => null
            ],
            "likes" => [
                'type' => 'INT',
                'null' => false,
                'unsigned' => true,
                'default' => 0,
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('user_id', 'Users', 'uid');
        $this->forge->createTable('Posts');
    }

    public function down()
    {
        $this->forge->dropTable('Posts');
    }
}
