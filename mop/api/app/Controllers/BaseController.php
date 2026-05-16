<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\ResponseInterface;

abstract class BaseController extends Controller
{
    protected function respondSuccess(mixed $data, string $message = 'OK', int $status = 200): ResponseInterface
    {
        return $this->response
            ->setStatusCode($status)
            ->setJSON([
                'status'   => $status,
                'error'    => false,
                'messages' => $message,
                'data'     => $data,
            ]);
    }

    protected function respondError(string $message, int $status = 500, mixed $data = null): ResponseInterface
    {
        return $this->response
            ->setStatusCode($status)
            ->setJSON([
                'status'   => $status,
                'error'    => true,
                'messages' => $message,
                'data'     => $data,
            ]);
    }
}
