<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\PostModel;
use CodeIgniter\HTTP\ResponseInterface;

class PostController extends BaseController
{
    private $postModel;
    public function index()
    {
        $this->postModel = new PostModel();
    }

    public function getPosts()
    {
        $this->postModel->findAll();
    }
}
