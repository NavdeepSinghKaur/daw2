<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'HomeController::index');
$routes->get('/post/new', 'Posts/Post::new');

// login routes
$routes->get('welcome', 'AuthController::index');
$routes->get('login', 'AuthController::loginView');

$routes->post('login', 'AuthController::login');

// Registration Routes
$routes->get('register', 'AuthController::registerView');
$routes->post('register', 'AuthController::create');

$routes->get('logout', 'HomeController::logout');