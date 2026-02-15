<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;
use CodeIgniter\Database\RawSql;

class CreateUsersTableMigration extends Migration
{
    public function up()
    {
        $this->forge->addField([
            "uid" => [
                'type' => 'VARCHAR',
                'constraint' => 128,
                'null' => false,
                'unique' => true,
            ],
            "name" => [
                'type' => 'VARCHAR',
                'constraint' => 80,
                'null' => 'false'
            ],
            "email" => [
                'type' => 'VARCHAR',
                'constraint' => 155,
                'null' => false,
                'unique' => true
            ],
            "password" => [
                'type' => 'VARCHAR',
                'constraint' => 512,
                'null' => false,
            ],
            "admin" => [
                'type' => 'INT',
            ],
            "created_at" => [
                'type' => 'TIMESTAMP',
                'default' => new RawSql('CURRENT_TIMESTAMP'),
            ],
            "deleted_at" => [
                'type' => 'TIMESTAMP',
                'default' => null
            ]
        ]);

        // $this->forge->addKey('id', true, true);
        $this->forge->addKey('uid', true, true);
        $this->forge->createTable('Users');
    }

    public function down()
    {
        $this->forge->dropTable('Users');
    }
}
