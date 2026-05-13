<?php

namespace App\Domain\Entities;

class User
{
    public function __construct(
        public readonly string $uid,
        public readonly string $name,
        public readonly string $password = '',
        public readonly string $description = ''
    ) {}

    public function toArray(): array
    {
        return [
            'uid'         => $this->uid,
            'name'        => $this->name,
            'description' => $this->description,
        ];
    }
}
