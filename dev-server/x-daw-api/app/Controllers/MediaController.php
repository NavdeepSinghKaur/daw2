<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class MediaController extends BaseController
{
    public $post;

    public function index()
    {
        [$post['image_url'], $post['mime_type']] = $this->recoverAllImages();
        return view('Images/GetImages', ['images' => $post]);
    }

    private function recoverAllImages()
    {
        $base64List = [];
        $mimeTypeList = [];
        $mediaModel = model('MediaModel');
        $media = $mediaModel->where('user_id', session()->get('id'))->findAll();
        foreach ($media as $file) {
            $path = WRITEPATH . 'uploads/posts/' . $file['media_url'];
            if (file_exists($path)) {
                $base64 = base64_encode(file_get_contents($path));
                $mimeType = mime_content_type($path);
    
                $base64List[] = $base64;
                $mimeTypeList[] = $mimeType;
            }
        }
        return [$base64List, $mimeTypeList];
    }
}
