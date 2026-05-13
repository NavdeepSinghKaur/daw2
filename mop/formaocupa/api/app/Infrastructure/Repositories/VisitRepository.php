<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Entities\Visit;
use App\Domain\Repositories\VisitRepositoryInterface;
use App\Models\VisitsModel;

class VisitRepository implements VisitRepositoryInterface
{
    public function __construct(private VisitsModel $model = new VisitsModel()) {}

    public function create(Visit $visit): Visit
    {
        $id = $this->model->insert([
            'date'    => $visit->date,
            'standId' => $visit->standId,
            'userId'  => $visit->userId,
        ], true);

        return new Visit(
            id: (int) $id,
            date: $visit->date,
            standId: $visit->standId,
            userId: $visit->userId
        );
    }

    public function findByUserId(string $userId): array
    {
        $rows = $this->model->where('userId', $userId)->orderBy('date', 'DESC')->findAll();

        return array_map(fn ($row) => new Visit(
            id: (int) $row['id'],
            date: (string) $row['date'],
            standId: (string) $row['standId'],
            userId: (string) $row['userId']
        ), $rows);
    }
}
