<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// home routes
$routes->get('/', 'HomeController::index');
$routes->get('logout', 'HomeController::logout');


// post routes
$routes->get('/post/new', 'PostController::new');
$routes->post('/post/new', 'PostController::create');
$routes->get('/post', 'PostController::getPosts');
$routes->get('/post/reply/(:segment)', 'PostController::reply/$1');
$routes->post('/post/reply', 'PostController::createReply');
$routes->get('/post/delete/(:segment)', 'PostController::delete/$1');
$routes->get('/post/edit/(:segment)', 'PostController::edit/$1');

// login routes
$routes->get('welcome', 'AuthController::index');
$routes->get('login', 'AuthController::loginView');
$routes->post('login', 'AuthController::login');

// Registration Routes
$routes->get('register', 'AuthController::registerView');
$routes->post('register', 'AuthController::create');

// Captcha routes
$routes->get('captcha', 'CaptchaController::index');

