<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('api', static function ($routes): void {
    $routes->post('login', 'AuthController::login');
    $routes->post('register', 'AuthController::register');
    $routes->post('register-visit', 'VisitsController::register');

    $routes->post('logout', 'AuthController::logout');
    $routes->get('profile', 'AuthController::profile');
    $routes->post('visits/(:segment)/(:segment)', 'VisitsController::register/$1/$2');
    $routes->get('visits/history/(:segment)', 'VisitsController::history/$1');

    // $routes->options('(:any)', static function () { });
});
