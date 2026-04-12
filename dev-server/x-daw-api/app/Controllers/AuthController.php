<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\UserModel;

class AuthController extends BaseController
{
    protected UserModel $userModel;

    public function __construct() {
        $this->userModel = new UserModel();
    }

    public function index()
    {
        if (session()->get('email') !== null) {
            return redirect()->to('/');
        }
        return view('Welcome.php');
    }

    public function loginView()
    {
        if (session()->get('email') !== null) {
            return redirect()->to('/');
        }

        return view('Login.php');
    }

    public function registerView()
    {
        if (session()->get('email') !== null) {
            return redirect()->to('/');
        }

        return view('Register');
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

    public function create()
    {
        $validationRules = [
            'name' => [
                'rules' => 'required|min_length[3]|max_length[80]',
                'errors' => [
                    'required'   => 'El nom és obligatori',
                    'min_length' => 'El nom ha de tenir almenys 3 caràcters',
                    'max_length' => 'El nom no pot superar els 80 caràcters'
                ]
            ],
            'email' => [
                'rules' => 'required|valid_email|is_unique[Users.email]',
                'errors' => [
                    'required'    => 'Correu electrònic obligatori',
                    'valid_email' => 'Introdueix una adreça de correu vàlida',
                    'is_unique'   => 'Aquest correu electrònic ja està registrat'
                ]
            ],
            'password' => [
                'rules' => 'required|min_length[8]',
                'errors' => [
                    'required'   => 'La contrasenya és obligatòria',
                    'min_length' => 'La contrasenya ha de tenir almenys 8 caràcters'
                ]
            ],
            'password_confirm' => [
                'rules' => 'required|matches[password]',
                'errors' => [
                    'required' => 'Confirma la contrasenya',
                    'matches'  => 'Les contrasenyes no coincideixen'
                ]
            ],
        ];

        if (!$this->validate($validationRules)) {
            return redirect()->back()
                ->withInput()
                ->with('errors', $this->validator->getErrors());
        }

        $data = [
            'name' => $this->request->getPost('name'),
            'email' => $this->request->getPost('email'),
            'password' => $this->request->getPost('password'),
        ];

        $captcha = session()->get('captchaResult');
        $captchaInput = $this->request->getPost('captcha-answer');

        if ($captcha != $captchaInput) {
            $validationErrors = $this->validator->getErrors() ?? [];
            $validationErrors[] = 'El captcha no es correcte';
            return redirect()->back()->withInput()->with('errors', $validationErrors);
        }

        $userId = $this->userModel->insert($data);
        if ($userId) {
            return redirect()->to('/login');
        } else {
            return redirect()->back()
                ->withInput()
                ->with('errors', $this->userModel->errors());
        }

    }

}
