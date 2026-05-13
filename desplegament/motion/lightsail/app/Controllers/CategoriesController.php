<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

use App\Models\CategoryModel;

class CategoriesController extends BaseController
{
    public function index()
    {
        $categoryModel = new CategoryModel();
        $userId = session()->get('user_id');

        $data = [
            'title'      => 'Categories',
            'categories' => $categoryModel->where('user_id', $userId)->findAll(),
        ];

        return view('categories/index', $data);
    }

    public function store()
    {
        $categoryModel = new CategoryModel();
        $userId = session()->get('user_id');

        $data = [
            'name'    => $this->request->getPost('name'),
            'user_id' => $userId,
        ];

        if ($categoryModel->save($data)) {
            return redirect()->to('/categories')->with('success', 'Category created successfully.');
        }

        return redirect()->back()->withInput()->with('errors', $categoryModel->errors());
    }

    public function edit($id)
    {
        $categoryModel = new CategoryModel();
        $userId = session()->get('user_id');
        $category = $categoryModel->where('id', $id)->where('user_id', $userId)->first();

        if (!$category) {
            return redirect()->to('/categories')->with('error', 'Category not found.');
        }

        $data = [
            'title'    => 'Edit Category',
            'category' => $category,
        ];

        return view('categories/edit', $data);
    }

    public function update($id)
    {
        $categoryModel = new CategoryModel();
        $userId = session()->get('user_id');
        $category = $categoryModel->where('id', $id)->where('user_id', $userId)->first();

        if (!$category) {
            return redirect()->to('/categories')->with('error', 'Category not found.');
        }

        $data = [
            'name' => $this->request->getPost('name'),
        ];

        if ($categoryModel->update($id, $data)) {
            return redirect()->to('/categories')->with('success', 'Category updated successfully.');
        }

        return redirect()->back()->withInput()->with('errors', $categoryModel->errors());
    }

    public function delete($id)
    {
        $categoryModel = new CategoryModel();
        $userId = session()->get('user_id');
        $category = $categoryModel->where('id', $id)->where('user_id', $userId)->first();

        if (!$category) {
            return redirect()->to('/categories')->with('error', 'Category not found.');
        }

        $categoryModel->delete($id);
        return redirect()->to('/categories')->with('success', 'Category deleted successfully.');
    }
}
