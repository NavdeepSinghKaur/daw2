<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Entities\Stand;
use App\Domain\Repositories\StandRepositoryInterface;
use App\Models\UsersModel;

class StandRepository implements StandRepositoryInterface
{
    public function __construct(private UsersModel $model = new UsersModel()) {}

    public function findByUserId(string $userId): ?Stand
    {
        return $this->findById($userId);
    }

    public function findById(string $standId): ?Stand
    {
        $row = $this->model->find($standId);
        if (! $row) {
            return null;
        }

        return new Stand(
            id: (string) $row['uid'],
            name: (string) ($row['name'] ?? ''),
            description: (string) ($row['description'] ?? '')
        );
    }
}
