<?php

namespace App\Domain\Entities;

class Visit
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $date,
        public readonly string $standId,
        public readonly string $userId
    ) {}

    public function toArray(): array
    {
        return [
            'ticketnum' => (string) $this->id,
            'standid'   => $this->standId,
            'visitdate' => $this->date,
        ];
    }
}
