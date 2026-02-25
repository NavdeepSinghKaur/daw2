<?php

namespace App\Cells;

use CodeIgniter\View\Cells\Cell;

class PostReplyCell extends Cell
{
    public $replies = [];
    public $parent = [];

    public function mount($post_id)
    {
        $postModel = model('PostModel');
        $mediaModel = model('MediaModel');
        $this->parent = $postModel->find($post_id);
        $this->replies = $postModel->where('parent_id', $post_id)->findAll();
    }
}
