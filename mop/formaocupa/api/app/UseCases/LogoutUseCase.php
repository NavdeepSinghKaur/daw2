<?php

namespace App\UseCases;

use App\Infrastructure\Services\JWTService;

class LogoutUseCase
{
    public function __construct(private JWTService $jwt) {}

    public function execute(string $token): void
    {
        $this->jwt->invalidate($token);
    }
}
