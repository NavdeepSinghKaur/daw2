<?php

namespace App\Infrastructure\Services;

class JWTService
{
    private const SECRET = 'formaocupa-secret-change-me';
    private const TTL    = 3600;

    public function issue(string $uid): string
    {
        $header  = ['alg' => 'HS256', 'typ' => 'JWT'];
        $payload = [
            'sub' => $uid,
            'iat' => time(),
            'exp' => time() + self::TTL,
            'jti' => bin2hex(random_bytes(8)),
        ];

        $h = $this->b64(json_encode($header));
        $p = $this->b64(json_encode($payload));
        $s = $this->b64(hash_hmac('sha256', "$h.$p", self::SECRET, true));

        return "$h.$p.$s";
    }

    public function decode(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }
        [$h, $p, $s] = $parts;

        $expected = $this->b64(hash_hmac('sha256', "$h.$p", self::SECRET, true));
        if (! hash_equals($expected, $s)) {
            return null;
        }

        $payload = json_decode($this->b64decode($p), true);
        if (! $payload || ($payload['exp'] ?? 0) < time()) {
            return null;
        }

        if (TokenBlacklist::has($payload['jti'] ?? '')) {
            return null;
        }

        return $payload;
    }

    public function invalidate(string $token): void
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return;
        }
        $payload = json_decode($this->b64decode($parts[1]), true);
        if (! empty($payload['jti'])) {
            TokenBlacklist::add($payload['jti'], (int) ($payload['exp'] ?? time()));
        }
    }

    private function b64(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private function b64decode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}
