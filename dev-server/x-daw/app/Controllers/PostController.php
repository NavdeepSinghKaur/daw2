<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class PostController extends BaseController
{
    private $postModel;
    private $mediaModel;
    public function __construct()
    {
        $this->postModel = model('PostModel');
        helper('uuid_helper');
    }

    public function index()
    {
    }

    public function reply($parent_id)
    {
        return view('Posts/Reply', ['parent_id' => $parent_id]);
    }

    public function createReply($parentId)
    {
        $session = session();
        $postData = [
            'parent_id' => $parentId,
            'user_id' => $session->get('id'),
            'title' => $this->request->getPost('title'),
            'text' => $this->request->getPost('text'),
            'is_public' => $this->request->getPost('checkbox') == 'on' 
                ? true
                : false,
        ];
        $this->postModel->insert($postData);

        return redirect()->to('/post/reply/' . $parentId);
    }

    public function new()
    {
        return view('Posts/NewPost');
    }

    public function create()
    {
        $this->mediaModel = model('MediaModel');

        $session = session();
        $media = $this->request->getFileMultiple('media');

        
        $postData = [
            'user_id' => $session->get('id'),
            'title' => $this->request->getPost('title'),
            'text' => $this->request->getPost('text'),
            'is_public' => $this->request->getPost('checkbox') == 'on' 
            ? true
            : false,
        ];

        $this->postModel->insert($postData);

        if ($media !== null) {
            foreach($media as $file) {
                if ($file->isValid() && !$file->hasMoved()) {
                    $mediaName = generate_uuid();
                    $file->move(WRITEPATH . 'uploads/posts', $mediaName);
                    
                    $mediaData = [
                        'post_id' => $this->postModel->getInsertID(),
                        'user_id' => $session->get('id'),
                        'media_url' => $mediaName,
                        'type' => $file->getClientMimeType(),
                    ];
                    print_r($mediaData);
                    $this->mediaModel->insert($mediaData);
                }
            }
        }


        return redirect()->to('/');
    }

    public function edit($id)
    {
        $post = $this->postModel->find($id);
        return view('Posts/Edit', ['post' => $post]);
    }

    public function saveEdit($id) 
    {
        $postData = [
            'title' => $this->request->getPost('title'),
            'text' => $this->request->getPost('text'),
            'is_public' => $this->request->getPost('checkbox') == 'on' 
                ? true
                : false,
        ];

        $this->postModel->update($id, $postData);
        return redirect()->to('/post/reply/' . $id);
    }

    public function delete($id)
    {
        $this->postModel->delete($id);
        return redirect()->to('/');
    }
}
