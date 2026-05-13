<?php

namespace App\Domain\Repositories;

use App\Domain\Entities\Visit;

interface VisitRepositoryInterface
{
    public function create(Visit $visit): Visit;

    /** @return Visit[] */
    public function findByUserId(string $userId): array;
}
