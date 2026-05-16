<?php

namespace App\Models;

use CodeIgniter\Model;

class UsersModel extends Model
{
    protected $table = 'Users';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = false;
    protected $returnType = 'array';
    protected $allowedFields = ['id', 'username', 'password', 'description'];
    protected $useTimestamps = false;

    public function findByName(string $name): ?array
    {
        $row = $this->where('username', $name)->first();
        return $row ?: null;
    }
}
