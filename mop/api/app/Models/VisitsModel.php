<?php

namespace App\Models;

use CodeIgniter\Model;

class VisitsModel extends Model
{
    protected $table            = 'Visits';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = false;
    protected $returnType       = 'array';
    protected $allowedFields    = ['id', 'date', 'stand_id', 'user_id'];
    protected $useTimestamps    = false;
}
