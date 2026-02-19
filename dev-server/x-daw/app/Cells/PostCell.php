<?php

namespace App\Cells;

use App\Models\PostModel;
use CodeIgniter\View\Cells\Cell;

class PostCell extends Cell
{
    public $posts = [];

    public function mount()
    {
        $postModel = model('PostModel');
        $this->posts = $postModel->where('parent_id', null)->orderBy('created_at', 'ASC')->findAll();
    }
}
