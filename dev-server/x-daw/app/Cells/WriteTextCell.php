<?php

namespace App\Cells;

use CodeIgniter\View\Cells\Cell;

class WriteTextCell extends Cell
{
    public string $userId;
    public string $postId;

    public function mount($userId, $postId = null)
    {
        $this->userId = $userId;
        $this->postId = $postId;

        
    }
}
