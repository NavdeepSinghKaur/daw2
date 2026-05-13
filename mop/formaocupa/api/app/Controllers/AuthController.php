<?php

namespace App\Controllers;

use App\Infrastructure\Repositories\StandRepository;
use App\Infrastructure\Repositories\UserRepository;
use App\Infrastructure\Services\JWTService;
use App\UseCases\GetUserProfileUseCase;
use App\UseCases\LoginUseCase;
use App\UseCases\LogoutUseCase;
use CodeIgniter\HTTP\ResponseInterface;
use DomainException;

class AuthController extends BaseController
{
    public function login(): ResponseInterface
    {
        $body  = $this->request->getJSON(true) ?? $this->request->getPost();
        $rules = ['username' => 'required|string', 'password' => 'required|string'];

        if (! $this->validateData($body ?? [], $rules)) {
            return $this->respondError('Validation failed', 400, $this->validator->getErrors());
        }

        try {
            $token = (new LoginUseCase(new UserRepository(), new JWTService()))
                ->execute($body['username'], $body['password']);
        } catch (DomainException $e) {
            return $this->respondError($e->getMessage(), $e->getCode() ?: 401);
        }

        return $this->respondSuccess(['token' => $token], 'Login successful');
    }

    public function logout(): ResponseInterface
    {
        $token = $this->request->token ?? null;
        if (! $token) {
            return $this->respondError('Missing token', 401);
        }

        (new LogoutUseCase(new JWTService()))->execute($token);

        return $this->respondSuccess(null, 'Logout successful');
    }

    public function profile(): ResponseInterface
    {
        $uid = $this->request->userId ?? null;
        if (! $uid) {
            return $this->respondError('Unauthorized', 401);
        }

        try {
            $data = (new GetUserProfileUseCase(new UserRepository(), new StandRepository()))
                ->execute($uid);
        } catch (DomainException $e) {
            return $this->respondError($e->getMessage(), $e->getCode() ?: 500);
        }

        return $this->respondSuccess($data, 'Profile retrieved');
    }
}
