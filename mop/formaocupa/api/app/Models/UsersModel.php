<?php

namespace App\Models;

use CodeIgniter\Model;

class UsersModel extends Model
{
    protected $table            = 'users';
    protected $primaryKey       = 'uid';
    protected $useAutoIncrement = false;
    protected $returnType       = 'array';
    protected $allowedFields    = ['uid', 'name', 'password', 'description'];
    protected $useTimestamps    = false;

    public function findByName(string $name): ?array
    {
        $row = $this->where('name', $name)->first();
        return $row ?: null;
    }
}
