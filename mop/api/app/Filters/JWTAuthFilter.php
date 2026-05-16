<?php

namespace App\Filters;

use App\Infrastructure\Services\JWTService;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class JWTAuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        if (strcasecmp($request->getMethod(), 'OPTIONS') === 0) {
            return;
        }

        $header = $request->getHeaderLine('Authorization');
        if (! $header || ! preg_match('/Bearer\s+(.+)/i', $header, $m)) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON([
                    'status'   => 401,
                    'error'    => true,
                    'messages' => 'Missing token',
                    'data'     => null,
                ]);
        }

        $payload = (new JWTService())->decode($m[1]);
        if (! $payload) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON([
                    'status'   => 401,
                    'error'    => true,
                    'messages' => 'Invalid or expired token',
                    'data'     => null,
                ]);
        }

        $request->jwt    = $payload;
        $request->token  = $m[1];
        $request->userId = (string) $payload['sub'];
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}
