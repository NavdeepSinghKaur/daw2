<?php

namespace App\Cells;

use CodeIgniter\View\Cells\Cell;

class WriteTextCell extends Cell
{
    public string $userId;
    public string $postId;
    public string $route;
    public string $title;
    public string $text;
    public string $parentId;
    public array $configuration = [];


    // pass the url where to point
    // the text to show in the button
    // 
    public function mount($userId = '', $route = '', $postId = '', $title = '', $text = '', $parentId = '')
    {
        $this->userId = $userId;
        $this->postId = $postId;
        $this->route = $route;
        if ($route === '/post/edit') {
            $this->title = $title;
            $this->text = $text;
        }
        $this->parentId = $parentId;
        print_r($this->parentId);
        // print_r($this->route);
        // echo ($this->route == '/post/newEdit' && isset($this->text));
        // print_r($this->text);
        // print_r($this->title);
        // die;
    }
}
