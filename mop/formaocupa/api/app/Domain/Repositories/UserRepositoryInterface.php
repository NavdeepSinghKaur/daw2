<?php

namespace App\Domain\Repositories;

use App\Domain\Entities\User;

interface UserRepositoryInterface
{
    public function findByName(string $name): ?User;
    public function findByUid(string $uid): ?User;
}
