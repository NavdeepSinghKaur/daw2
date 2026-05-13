<?php

namespace App\Domain\Repositories;

use App\Domain\Entities\Stand;

interface StandRepositoryInterface
{
    public function findByUserId(string $userId): ?Stand;
    public function findById(string $standId): ?Stand;
}
