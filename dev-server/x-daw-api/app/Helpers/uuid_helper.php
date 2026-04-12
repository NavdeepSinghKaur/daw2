<?php

if (!function_exists('generate_uuid')) {
    function generate_uuid(): string 
    {
        $hex = str_pad(dechex((int)(microtime(true) * 1000)), 12, '0', STR_PAD_LEFT);

        $randomHex = bin2hex(random_bytes(10));

        $uuid = sprintf(
            '%s-%s-%s%s-%s-%s',
            substr($hex, 0, 8),
            substr($hex, 8, 4),
            '7',
            substr($randomHex, 0, 3),
            '8' . substr($randomHex, 3, 3),
            substr($randomHex, 6, 12),
        );

        return $uuid;
    }
}