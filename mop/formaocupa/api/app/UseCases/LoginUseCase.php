<?php

namespace App\UseCases;

use App\Domain\Repositories\UserRepositoryInterface;
use App\Infrastructure\Services\JWTService;
use DomainException;

class LoginUseCase
{
    public function __construct(
        private UserRepositoryInterface $users,
        private JWTService $jwt
    ) {}

    public function execute(string $username, string $password): string
    {
        $user = $this->users->findByName($username);
        if (! $user || ! password_verify($password, $user->password)) {
            throw new DomainException('Invalid credentials', 401);
        }

        return $this->jwt->issue($user->uid);
    }
}
