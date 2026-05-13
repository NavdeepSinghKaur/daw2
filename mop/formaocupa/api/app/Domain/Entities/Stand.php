<?php

namespace App\Domain\Entities;

class Stand
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly string $description = ''
    ) {}

    public function toArray(): array
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'description' => $this->description,
        ];
    }
}
