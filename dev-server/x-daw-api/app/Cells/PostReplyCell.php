<?php

namespace App\Cells;

use CodeIgniter\View\Cells\Cell;
use League\CommonMark\CommonMarkConverter;

class PostReplyCell extends Cell
{
    public $replies = [];
    public $parent = [];
    public $converter;
    public $pag;

    
    public function mount($post_id)
    {
        $configuration = [
            'html_input' => 'strip',
            'allow_unsafe_links' => false,

        ];
        $this->converter = new CommonMarkConverter($configuration);
        $postModel = model('PostModel');

        $this->parent = $postModel->find($post_id);
        $this->replies = $postModel->where('parent_id', $post_id)->paginate(10);
        $this->pag = $postModel->pager;
    }
}
