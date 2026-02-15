<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ForeignKeyMediaTableMigration extends Migration
{
public function up()
    {
        $this->db->query("
            ALTER TABLE Posts
            ADD CONSTRAINT posts_parent_id_fk
            FOREIGN KEY (parent_id) REFERENCES Posts(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        ");
    }

    public function down()
    {
        $this->forge->dropForeignKey('Posts', 'posts_parent_id_fk');
    }
}
