<?php

namespace App\Infrastructure\Helpers;

use Symfony\Component\Uid\Ulid;

class TokenGenerator
{
    public static function generate(): string
    {
        $ulid = new Ulid();

        return $ulid->toRfc4122();
    }
}