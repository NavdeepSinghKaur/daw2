<?php

namespace App\Infrastructure\Services;

class TokenBlacklist
{
    public static function add(string $jti, int $exp): void
    {
        $cache = service('cache');
        $ttl   = max(60, $exp - time());
        $cache->save('jwt_blacklist_' . $jti, 1, $ttl);
    }

    public static function has(string $jti): bool
    {
        if ($jti === '') {
            return false;
        }
        return (bool) service('cache')->get('jwt_blacklist_' . $jti);
    }
}
