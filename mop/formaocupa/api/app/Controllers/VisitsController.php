<?php

namespace App\Controllers;

use App\Infrastructure\Repositories\StandRepository;
use App\Infrastructure\Repositories\VisitRepository;
use App\UseCases\GetVisitHistoryUseCase;
use App\UseCases\RegisterVisitUseCase;
use CodeIgniter\HTTP\ResponseInterface;
use DomainException;

class VisitsController extends BaseController
{
    public function register(string $standId): ResponseInterface
    {
        $visitorUid = $this->request->userId ?? null;
        if (! $visitorUid) {
            return $this->respondError('Unauthorized', 401);
        }

        try {
            $visit = (new RegisterVisitUseCase(new VisitRepository(), new StandRepository()))
                ->execute($visitorUid, $standId);
        } catch (DomainException $e) {
            return $this->respondError($e->getMessage(), $e->getCode() ?: 500);
        }

        return $this->respondSuccess($visit->toArray(), 'Visit registered');
    }

    public function history(string $visitorId): ResponseInterface
    {
        try {
            $history = (new GetVisitHistoryUseCase(new VisitRepository(), new StandRepository()))
                ->execute($visitorId);
        } catch (DomainException $e) {
            return $this->respondError($e->getMessage(), $e->getCode() ?: 500);
        }

        return $this->respondSuccess($history, 'History retrieved');
    }
}
