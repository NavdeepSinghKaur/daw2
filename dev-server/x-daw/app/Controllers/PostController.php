<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\PostModel;
use CodeIgniter\HTTP\ResponseInterface;

class PostController extends BaseController
{
    private $postModel;
    private $mediaModel;
    public function __construct()
    {
        $this->postModel = model('PostModel');
    }

    public function index()
    {
    }

    public function reply($parent_id)
    {
        return view('Posts/Reply', ['parent_id' => $parent_id]);
    }

    public function createReply()
    {
        // $this->postModel = new PostModel();

        $session = session();
        $postData = [
            'parent_id' => $this->request->getPost('parent_id'),
            'user_id' => $session->get('id'),
            'title' => $title = $this->request->getPost('title'),
            'text' => $text = $this->request->getPost('text'),
            'is_public' => $visibility = $this->request->getPost('checkbox') == 'on' 
                ? true
                : false,
        ];
        $this->postModel->insert($postData);

        return redirect()->to('/post/reply/' . $this->request->getPost('parent_id'));
    }

    public function getPosts()
    {
        $posts = $this->postModel->findAll();
        var_dump($posts);
        die;
    }

    public function new()
    {
        return view('Posts/NewPost');
    }

    public function create()
    {
        // $this->postModel = model('PostModel');
        $this->mediaModel = model('MediaModel');

        $session = session();
        $media = $this->request->getFile('media');

        
        $postData = [
            'user_id' => $session->get('id'),
            'title' => $title = $this->request->getPost('title'),
            'text' => $text = $this->request->getPost('text'),
            'is_public' => $visibility = $this->request->getPost('checkbox') == 'on' 
            ? true
            : false,
        ];

        $this->postModel->insert($postData);
        
        if ($media->isValid() && !$media->hasMoved()) {
            $mediaName = bin2hex(random_bytes(16));
            $media->move(WRITEPATH . 'uploads/posts', $mediaName);
            
            $mediaData = [
                'post_id' => $this->postModel->getInsertID(),
                'media_url' => $mediaName,
                'type' => $media->getClientMimeType(),
            ];
            $this->mediaModel->insert($mediaData);
        }


        return redirect()->to('/');
    }

    public function edit($id)
    {
        $post = $this->postModel->find($id);
        return view('Posts/Edit', ['post' => $post]);
    }

    public function delete($id)
    {
        $this->postModel->delete($id);
        return redirect()->to('/');
    }
}
