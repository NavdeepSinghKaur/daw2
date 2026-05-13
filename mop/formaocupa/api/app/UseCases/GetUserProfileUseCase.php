<?php

namespace App\UseCases;

use App\Domain\Repositories\StandRepositoryInterface;
use App\Domain\Repositories\UserRepositoryInterface;
use DomainException;

class GetUserProfileUseCase
{
    public function __construct(
        private UserRepositoryInterface $users,
        private StandRepositoryInterface $stands
    ) {}

    public function execute(string $uid): array
    {
        $user = $this->users->findByUid($uid);
        if (! $user) {
            throw new DomainException('User not found', 404);
        }

        $stand = $this->stands->findByUserId($uid);
        if (! $stand) {
            throw new DomainException('Stand not found', 404);
        }

        return [
            'stand' => $stand->toArray(),
            'user'  => [
                'name'        => $user->name,
                'description' => $user->description,
            ],
        ];
    }
}
