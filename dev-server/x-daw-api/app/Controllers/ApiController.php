<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\UserModel;

class ApiController extends BaseController
{
    protected UserModel $userModel;
    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    public function index()
    {

    }

    public function login()
    {
        $validation = [
            "email" => [
                "rules" => "required|valid_email",
                "errors" => [
                    "required" => 'No has introduït cap correu',
                ]
            ],
            "password" => [
                "rules" => 'required',
                "errors" => [
                    "required" => "No té cap contrasenya",
                    //"validLogin" => "Email o contrasenya incorrectes"
                ]
            ],
        ];

        if (!$this->validate($validation)) {
            return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
        }


        $data = [
            'email' => $this->request->getPost('email'),
        ];

        $pwd = $this->request->getPost('password');

        $user = $this->userModel->where($data)->first();

        $res = '';
        if ($user !== null) {
            $res = password_verify($pwd, $user['password']);
        }

        $captcha = session()->get('captchaResult');
        $captchaInput = $this->request->getPost('captcha-answer');

        if ($captcha != $captchaInput) {
            $validationErrors = $this->validator->getErrors() ?? [];
            $validationErrors[] = 'El captcha no es correcte';
            return redirect()->back()->withInput()->with('errors', $validationErrors);
        }

        if ($res) {
            $session = session();

            $session->set('email', $user['email']);
            $session->set('id', $user['uid']);
            $session->set('name', $user['name']);
            $session->set('admin', $user['admin']);
            return redirect()->to('/');
        }
    }
}
