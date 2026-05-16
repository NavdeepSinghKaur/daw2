<?php

namespace App\Controllers;

use App\Infrastructure\Helpers\TokenGenerator;
use App\Models\VisitsModel;
use CodeIgniter\HTTP\ResponseInterface;

class VisitsController extends BaseController
{
    public function register(string $standId, string $userId = null): ResponseInterface
    {
        $body      = $this->request->getJSON(true) ?? $this->request->getPost();
        $visitorUid = $userId ?? $body['userid'] ?? $body['userId'] ?? $this->request->userId ?? null;

        if (!$visitorUid) {
            return $this->respondError('Unauthorized: Missing user ID', 401);
        }

        $model = new VisitsModel();
        $data  = [
            'id'       => TokenGenerator::generate(),
            'date'     => date('Y-m-d H:i:s'),
            'stand_id' => $standId,
            'user_id'  => $visitorUid,
        ];

        if (!$model->insert($data)) {
            return $this->respondError('Could not register visit', 500);
        }

        return $this->respondSuccess($data, 'Visit registered');
    }

    public function history(string $visitorId): ResponseInterface
    {
        $model = new VisitsModel();
        $history = $model->where('user_id', $visitorId)->findAll();

        return $this->respondSuccess($history, 'History retrieved');
    }
}
