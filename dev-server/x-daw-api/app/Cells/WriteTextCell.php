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
    public array $parameters = [];
    public array $configuration = [];

    public function mount(array $parameters)
    {
        $this->userId = $parameters['userId'];
        $this->route = $parameters['route'];
        $this->postId = $parameters['postId'] ?? '';
        
        if ($this->route == '/post/reply') {
            $this->postId = $parameters['parentId'];

        }
            
        if ($this->route === '/post/edit') {
            $this->postId = $parameters['postId'] ?? '';
            $this->title = $parameters['title'];
            $this->text = $parameters['text'];
        }

        if ($this->route === '/post/new') {
            $this->postId = '';
        }
    }
}
