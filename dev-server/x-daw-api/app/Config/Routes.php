<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// home routes
$routes->get('/', 'HomeController::index');
$routes->get('logout', 'HomeController::logout');


// post routes
$routes->addPlaceholder('uuid', '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}');

$routes->get('/post/new', 'PostController::new');
$routes->post('/post/new', 'PostController::create');
// $routes->get('/post', 'PostController::getPosts');
$routes->get('/post/reply/(:uuid)', 'PostController::reply/$1');
$routes->post('/post/reply/(:uuid)', 'PostController::createReply/$1');

$routes->get('/post/delete/(:uuid)', 'PostController::delete/$1');

$routes->get('/post/edit/(:uuid)', 'PostController::edit/$1');
$routes->post('/post/edit/(:uuid)', 'PostController::saveEdit/$1');

// login routes
$routes->get('welcome', 'AuthController::index');
$routes->get('login', 'AuthController::loginView');
$routes->post('login', 'AuthController::login');

// Registration Routes
$routes->get('register', 'AuthController::registerView');
$routes->post('register', 'AuthController::create');

// Captcha routes
$routes->get('captcha', 'CaptchaController::index');

// Media routes
$routes->get('media', 'MediaController::index');

// API routes
// public routes
$routes->post('api/login', 'ApiController::login');
$routes->get('api/posts/get-post/(:uuid)', 'ApiController::getPost/$1');
$routes->get('api/posts/get-comments/(:uuid)', 'ApiController::getComments/$1');
$routes->get('api/posts/entire/(:uuid)', 'ApiController::getEntirePost/$1');
$routes->get('api/posts/post-data/(:uuid)', 'ApiController::getPostData/$1');


// private routes
$routes->group('api', ['filter' => 'auth'], function ($routes) {

});