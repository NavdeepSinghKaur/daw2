<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

use App\Models\NoteModel;
use App\Models\CategoryModel;

class NotesController extends BaseController
{
    public function index()
    {
        $noteModel = new NoteModel();
        $categoryModel = new CategoryModel();
        $userId = session()->get('user_id');
        
        $search = $this->request->getGet('search');
        $categoryId = $this->request->getGet('category');

        $query = $noteModel->where('user_id', $userId);

        if ($search) {
            $query->groupStart()
                  ->like('title', $search)
                  ->orLike('content', $search)
                  ->groupEnd();
        }

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        $data = [
            'title'      => 'My Notes',
            'notes'      => $query->orderBy('created_at', 'DESC')->paginate(9, 'notes'),
            'pager'      => $noteModel->pager,
            'categories' => $categoryModel->where('user_id', $userId)->findAll(),
            'search'     => $search,
            'selectedCategory' => $categoryId,
        ];

        return view('notes/index', $data);
    }

    public function show($id)
    {
        $noteModel = new NoteModel();
        $userId = session()->get('user_id');
        $note = $noteModel->where('id', $id)->where('user_id', $userId)->first();

        if (!$note) {
            return redirect()->to('/notes')->with('error', 'Note not found.');
        }

        $data = [
            'title' => $note['title'],
            'note' => $note,
        ];

        return view('notes/view', $data);
    }

    public function create()
    {
        $categoryModel = new CategoryModel();
        $userId = session()->get('user_id');

        $data = [
            'title' => 'New Note',
            'categories' => $categoryModel->where('user_id', $userId)->findAll(),
        ];

        return view('notes/create', $data);
    }

    public function store()
    {
        $noteModel = new NoteModel();
        $userId = session()->get('user_id');

        $data = [
            'title'       => $this->request->getPost('title'),
            'content'     => $this->request->getPost('content'),
            'category_id' => $this->request->getPost('category_id') ?: null,
            'user_id'     => $userId,
            'is_locked'   => 0,
        ];

        if ($noteModel->save($data)) {
            return redirect()->to('/notes')->with('success', 'Note created successfully.');
        }

        return redirect()->back()->withInput()->with('errors', $noteModel->errors());
    }

    public function edit($id)
    {
        $noteModel = new NoteModel();
        $categoryModel = new CategoryModel();
        $userId = session()->get('user_id');
        $note = $noteModel->where('id', $id)->where('user_id', $userId)->first();

        if (!$note) {
            return redirect()->to('/notes')->with('error', 'Note not found.');
        }

        if ($note['is_locked']) {
            return redirect()->to('/notes/show/' . $id)->with('error', 'This note is locked and cannot be edited.');
        }

        $data = [
            'title' => 'Edit Note',
            'note' => $note,
            'categories' => $categoryModel->where('user_id', $userId)->findAll(),
        ];

        return view('notes/edit', $data);
    }

    public function update($id)
    {
        $noteModel = new NoteModel();
        $userId = session()->get('user_id');
        $note = $noteModel->where('id', $id)->where('user_id', $userId)->first();

        if (!$note) {
            return redirect()->to('/notes')->with('error', 'Note not found.');
        }

        if ($note['is_locked']) {
            return redirect()->to('/notes/show/' . $id)->with('error', 'This note is locked and cannot be updated.');
        }

        $data = [
            'title'       => $this->request->getPost('title'),
            'content'     => $this->request->getPost('content'),
            'category_id' => $this->request->getPost('category_id') ?: null,
        ];

        if ($noteModel->update($id, $data)) {
            return redirect()->to('/notes/show/' . $id)->with('success', 'Note updated successfully.');
        }

        return redirect()->back()->withInput()->with('errors', $noteModel->errors());
    }

    public function delete($id)
    {
        $noteModel = new NoteModel();
        $userId = session()->get('user_id');
        $note = $noteModel->where('id', $id)->where('user_id', $userId)->first();

        if (!$note) {
            return redirect()->to('/notes')->with('error', 'Note not found.');
        }

        $noteModel->delete($id);
        return redirect()->to('/notes')->with('success', 'Note deleted successfully.');
    }

    public function lock($id)
    {
        $noteModel = new NoteModel();
        $userId = session()->get('user_id');
        $note = $noteModel->where('id', $id)->where('user_id', $userId)->first();

        if (!$note) {
            return redirect()->to('/notes')->with('error', 'Note not found.');
        }

        $noteModel->update($id, ['is_locked' => 1]);
        return redirect()->to('/notes/show/' . $id)->with('success', 'Note locked successfully.');
    }

    public function unlock($id)
    {
        $noteModel = new NoteModel();
        $userId = session()->get('user_id');
        $note = $noteModel->where('id', $id)->where('user_id', $userId)->first();

        if (!$note) {
            return redirect()->to('/notes')->with('error', 'Note not found.');
        }

        $noteModel->update($id, ['is_locked' => 0]);
        return redirect()->to('/notes/show/' . $id)->with('success', 'Note unlocked successfully.');
    }

    public function export($id, $format)
    {
        $noteModel = new NoteModel();
        $userId = session()->get('user_id');
        $note = $noteModel->where('id', $id)->where('user_id', $userId)->first();

        if (!$note) {
            return redirect()->to('/notes')->with('error', 'Note not found.');
        }

        $filename = url_title($note['title'], '-', true);
        $content = $note['content'];

        if ($format === 'md') {
            $filename .= '.md';
            $fileContent = "# " . $note['title'] . "\n\n" . $content;
            $contentType = 'text/markdown';
        } else {
            $filename .= '.txt';
            $fileContent = $note['title'] . "\n" . str_repeat('=', strlen($note['title'])) . "\n\n" . $content;
            $contentType = 'text/plain';
        }

        return $this->response->download($filename, $fileContent)->setContentType($contentType);
    }
}
