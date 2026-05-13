<?php

namespace App\Models;

use CodeIgniter\Model;

class VisitsModel extends Model
{
    protected $table            = 'visits';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['date', 'standId', 'userId'];
    protected $useTimestamps    = false;
}
