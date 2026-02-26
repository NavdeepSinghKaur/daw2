<?php

namespace App\Cells;

use CodeIgniter\View\Cells\Cell;

class PostCell extends Cell
{
    public $posts = [];
    public $isInsideReply = false;

    public function mount($post_id = null)
    {
        // if there are replies
        $postModel = model('PostModel');
        if ($post_id !== null) {
            $this->isInsideReply = true;
            $this->posts = $postModel->where('id', $post_id)->findAll();
        }
        
        // if it's the first
        if (!$this->isInsideReply) {
            $query = $postModel->where('parent_id', null);
            if (session()->get('admin') == false) {
                $query->groupStart()
                    ->where('is_public', true)
                    ->orWhere('user_id', session()->get('id'))
                ->groupEnd();
            }
            $this->posts = $query->orderBy('created_at', 'DESC')->paginate(10);
        }

        // with images
        foreach($this->posts as &$post) {
            [$post['image_url'], $post['mime_type']] = $this->getImage($post['id']);
        }
    }

    private function getImage($post_id)
    {
        $base64List = [];
        $mimeTypeList = [];
        $mediaModel = model('MediaModel');
        $media = $mediaModel->where('post_id', $post_id)->findAll();
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
