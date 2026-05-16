<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class GenerateVisitsTable extends Migration
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
            'date' => [
                'type' => 'DATETIME',
                'null' => false
            ],
            'stand_id' => [
                'type' => 'VARCHAR',
                'constraint' => 64,
                'null' => false
            ],
            'user_id' => [
                'type' => 'VARCHAR',
                'constraint' => 64,
                'null' => false
            ]
        ]);

        $this->forge->addKey('id', true);

        $this->forge->addForeignKey('user_id', 'Users', 'id', 'CASCADE', 'CASCADE');

        $this->forge->createTable('Visits');
    }

    public function down()
    {
        $this->forge->dropTable('Visits');
    }
}
