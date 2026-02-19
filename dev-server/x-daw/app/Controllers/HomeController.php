<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class HomeController extends BaseController
{
    public function index()
    {
        return view('Home.php');
    }

    public function logout()
    {
        if (session()->get('email') !== null) {
            session()->destroy();
        }
        return redirect('Home');
    }
}
