<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class GenerateUsersTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'VARCHAR',
                'constraint' => '64',
                'null' => false,
                'unique' => true,
            ],
            'username' => [
                'type' => 'VARCHAR',
                'constraint' => '64',
                'null' => false,
                'unique' => true,
            ],
            'password' => [
                'type' => 'VARCHAR',
                'constraint' => '512',
                'null' => false
            ],
            'description' => [
                'type' => 'TEXT',
                'null' => true
            ]
        ]);

        $this->forge->addKey('id', true);

        $this->forge->createTable('Users');
    }

    public function down()
    {
        $this->forge->dropTable('Users');
    }
}
