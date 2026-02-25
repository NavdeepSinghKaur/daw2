<?php

namespace App\Cells;

use App\Models\PostModel;
use CodeIgniter\View\Cells\Cell;

class PostCell extends Cell
{
    public $posts = [];
    public $isInsideReply = false;

    public function mount($post_id = null)
    {
        $postModel = model('PostModel');
        if ($post_id !== null) {
            $this->isInsideReply = true;
            $this->posts = $postModel->where('id', $post_id)->findAll();
            return $this->posts;
        }
        // $this->posts = $postModel->where('parent_id', null)->orderBy('created_at', 'ASC')->findAll();

        $query = $postModel->select('Posts.*, Media.media_url')
        ->join('Media', 'Media.post_id = Posts.id', 'left')
        ->where('parent_id', null);
        if (session()->get('admin') == false) {
            $query->groupStart()
                ->where('is_public', true)
                ->orWhere('user_id', session()->get('id'))
                // ->where('user_id !=', session()->get('id'))
            ->groupEnd();
        }
        $this->posts = $query->orderBy('created_at', 'ASC')->findAll();
        print_r($this->posts);
        if ($this->getImage($this->posts[0]['media_url']) !== null) {
            [$this->posts[0]['media_img'], $this->posts[0]['mime_type']] = $this->getImage($this->posts[0]['media_url']);
        }
    }

    private function getImage($imgName)
    {
        $path = WRITEPATH . 'uploads/posts/' . $imgName;
        if (file_exists($path)) {
            $base64 = base64_encode(file_get_contents($path));
            $mimeType = mime_content_type($path);

            return [$base64, $mimeType];
        }
    }
}
