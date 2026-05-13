<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Entities\User;
use App\Domain\Repositories\UserRepositoryInterface;
use App\Models\UsersModel;

class UserRepository implements UserRepositoryInterface
{
    public function __construct(private UsersModel $model = new UsersModel()) {}

    public function findByName(string $name): ?User
    {
        $row = $this->model->findByName($name);
        return $row ? $this->hydrate($row) : null;
    }

    public function findByUid(string $uid): ?User
    {
        $row = $this->model->find($uid);
        return $row ? $this->hydrate($row) : null;
    }

    private function hydrate(array $row): User
    {
        return new User(
            uid: (string) $row['uid'],
            name: (string) ($row['name'] ?? ''),
            password: (string) ($row['password'] ?? ''),
            description: (string) ($row['description'] ?? '')
        );
    }
}
