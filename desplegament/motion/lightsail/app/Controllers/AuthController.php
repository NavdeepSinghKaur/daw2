<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

use App\Models\UserModel;

class AuthController extends BaseController
{
    public function register()
    {
        if ($this->request->is('post')) {
            $userModel = new UserModel();
            
            $data = [
                'username' => $this->request->getPost('username'),
                'email'    => $this->request->getPost('email'),
                'password_hash' => password_hash($this->request->getPost('password'), PASSWORD_DEFAULT),
            ];

            if ($userModel->save($data)) {
                return redirect()->to('/login')->with('success', 'Registration successful. Please log in.');
            }

            return redirect()->back()->withInput()->with('errors', $userModel->errors());
        }

        return view('auth/register');
    }

    public function login()
    {
        if ($this->request->is('post')) {
            $userModel = new UserModel();
            $email = $this->request->getPost('email');
            $password = $this->request->getPost('password');

            $user = $userModel->where('email', $email)->first();

            if ($user && password_verify($password, $user['password_hash'])) {
                session()->set([
                    'user_id' => $user['id'],
                    'username' => $user['username'],
                    'logged_in' => true,
                ]);
                return redirect()->to('/notes');
            }

            return redirect()->back()->withInput()->with('error', 'Invalid login credentials.');
        }

        return view('auth/login');
    }

    public function logout()
    {
        session()->destroy();
        return redirect()->to('/login');
    }
}
