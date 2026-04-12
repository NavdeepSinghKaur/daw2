<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ForeignKeyMediaTableMigration extends Migration
{
public function up()
    {
        $this->forge->addForeignKey('parent_id', 'Posts', 'id', 'CASCADE', 'CASCADE', 'posts_parent_id_fk');
        $this->forge->processIndexes('Posts');
    }

    public function down()
    {
        $this->forge->dropForeignKey('Posts', 'posts_parent_id_fk');
    }
}
