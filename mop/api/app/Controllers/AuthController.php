<?php

namespace App\Controllers;

use App\Infrastructure\Helpers\TokenGenerator;
use App\Infrastructure\Services\JWTService;
use App\Models\UsersModel;
use CodeIgniter\HTTP\ResponseInterface;
use Exception;

class AuthController extends BaseController
{
    public function login(): ResponseInterface
    {
        $body = $this->request->getJSON(true) ?? $this->request->getPost();
        $rules = ['username' => 'required|string', 'password' => 'required|string'];

        if (!$this->validateData($body ?? [], $rules)) {
            return $this->respondError('Validation failed', 400, $this->validator->getErrors());
        }

        $model = new UsersModel();
        $user  = $model->findByName($body['username']);

        if (!$user || !password_verify($body['password'], $user['password'])) {
            return $this->respondError('Invalid credentials', 401);
        }

        $jwt   = new JWTService();
        $token = $jwt->issue($user['id']);

        return $this->respondSuccess([
            'token'  => $token,
            'userId' => $user['id']
        ], 'Login successful');
    }

    public function register(): ResponseInterface
    {
        $body = $this->request->getJSON(true) ?? $this->request->getPost();
        $rules = [
            'username' => 'required|string|is_unique[Users.username]',
            'password' => 'required|string|min_length[4]',
        ];

        if (!$this->validateData($body ?? [], $rules)) {
            return $this->respondError('Registration failed', 400, $this->validator->getErrors());
        }

        $model = new UsersModel();
        $uid   = TokenGenerator::generate();

        $data = [
            'id'          => $uid,
            'username'    => $body['username'],
            'password'    => password_hash($body['password'], PASSWORD_DEFAULT),
            'description' => $body['description'] ?? '',
        ];

        if (!$model->insert($data)) {
            return $this->respondError('Could not create user', 500);
        }

        $jwt   = new JWTService();
        $token = $jwt->issue($uid);

        return $this->respondSuccess([
            'token'  => $token,
            'userId' => $uid
        ], 'User registered successfully', 201);
    }

    public function logout(): ResponseInterface
    {
        $token = $this->request->token ?? null;
        if ($token) {
            (new JWTService())->invalidate($token);
        }

        return $this->respondSuccess(null, 'Logout successful');
    }

    public function profile(): ResponseInterface
    {
        $uid = $this->request->userId ?? null;
        if (!$uid) {
            return $this->respondError('Unauthorized', 401);
        }

        $model = new UsersModel();
        $user  = $model->find($uid);

        if (!$user) {
            return $this->respondError('User not found', 404);
        }

        unset($user['password']);

        return $this->respondSuccess($user, 'Profile retrieved');
    }
}
