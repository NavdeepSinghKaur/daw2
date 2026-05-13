<?php

namespace App\UseCases;

use App\Domain\Entities\Visit;
use App\Domain\Repositories\StandRepositoryInterface;
use App\Domain\Repositories\VisitRepositoryInterface;
use DomainException;

class RegisterVisitUseCase
{
    public function __construct(
        private VisitRepositoryInterface $visits,
        private StandRepositoryInterface $stands
    ) {}

    public function execute(string $visitorUid, string $standId): Visit
    {
        $stand = $this->stands->findById($standId);
        if (! $stand) {
            throw new DomainException('Stand not found', 404);
        }

        if ($stand->id === $visitorUid) {
            throw new DomainException('Cannot register a visit to your own stand', 400);
        }

        $visit = new Visit(
            id: null,
            date: date('Y-m-d H:i:s'),
            standId: $stand->id,
            userId: $visitorUid
        );

        return $this->visits->create($visit);
    }
}
