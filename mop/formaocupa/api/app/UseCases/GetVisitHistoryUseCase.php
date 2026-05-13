<?php

namespace App\UseCases;

use App\Domain\Repositories\StandRepositoryInterface;
use App\Domain\Repositories\VisitRepositoryInterface;

class GetVisitHistoryUseCase
{
    public function __construct(
        private VisitRepositoryInterface $visits,
        private StandRepositoryInterface $stands
    ) {}

    public function execute(string $visitorUid): array
    {
        $visits = $this->visits->findByUserId($visitorUid);

        return array_map(function ($visit) {
            $stand = $this->stands->findById($visit->standId);

            return [
                'stand' => $stand
                    ? $stand->toArray()
                    : ['id' => $visit->standId, 'name' => null, 'description' => null],
                'date'  => $visit->date,
            ];
        }, $visits);
    }
}
