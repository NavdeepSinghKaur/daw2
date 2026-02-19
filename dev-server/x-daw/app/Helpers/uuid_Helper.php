<?php

if (!function_exists('generate_uuid')) {
    function generate_uuid(): string 
    {
        $time = (int)(microtime(true) * 1000);
        $timeHex = str_pad(dechex($time), 10, '0', STR_PAD_LEFT);

        $randomHex = bin2hex(random_bytes(10));

        $uuid = sprintf(
            '%s-%s-%s%s-%s-%s',
            substr($timeHex, 0, 8),
            substr($timeHex, 8, 4),
            '7',
            substr($randomHex, 0, 3),
            '8' . substr($randomHex, 3, 3),
            substr($randomHex, 6, 12),
        );

        return $uuid;
    }
}