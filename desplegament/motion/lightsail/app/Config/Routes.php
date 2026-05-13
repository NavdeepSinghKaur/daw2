<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'AuthController::login');

$routes->match(['get', 'post'], 'register', 'AuthController::register');
$routes->match(['get', 'post'], 'login', 'AuthController::login');
$routes->get('logout', 'AuthController::logout');

$routes->group('notes', ['filter' => 'auth'], function($routes) {
    $routes->get('/', 'NotesController::index');
    $routes->get('create', 'NotesController::create');
    $routes->post('store', 'NotesController::store');
    $routes->get('show/(:num)', 'NotesController::show/$1');
    $routes->get('edit/(:num)', 'NotesController::edit/$1');
    $routes->post('update/(:num)', 'NotesController::update/$1');
    $routes->get('delete/(:num)', 'NotesController::delete/$1');
    $routes->get('lock/(:num)', 'NotesController::lock/$1');
    $routes->get('unlock/(:num)', 'NotesController::unlock/$1');
    $routes->get('export/(:num)/(:any)', 'NotesController::export/$1/$2');
});

$routes->group('categories', ['filter' => 'auth'], function($routes) {
    $routes->get('/', 'CategoriesController::index');
    $routes->post('store', 'CategoriesController::store');
    $routes->get('edit/(:num)', 'CategoriesController::edit/$1');
    $routes->post('update/(:num)', 'CategoriesController::update/$1');
    $routes->get('delete/(:num)', 'CategoriesController::delete/$1');
});
