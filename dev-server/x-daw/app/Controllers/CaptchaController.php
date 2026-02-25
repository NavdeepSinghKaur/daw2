<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class CaptchaController extends BaseController
{
    public function index()
    {
        
        $number1 = rand(1, 10);
        $number2 = rand(1, 10);
        $captcha = $number1 + $number2;

        session()->set('captcha', $captcha);

        $captchaImg = imagecreatetruecolor(200, 100);

        imagecolorallocate($captchaImg, 255, 255, 255);
        imagecolorallocate($captchaImg, 200, 200, 200);

        imagefill($captchaImg, 0, 0, imagecolorallocate($captchaImg, 128, 128, 128));

        $text = "$number1 + $number2 = ?";
        $result = $number1 + $number2;
        session()->set('captchaResult', $result);

        imagestring($captchaImg, 5, 20, 12, $text, imagecolorallocate($captchaImg, 0, 0, 0));

        header('Content-Type: image/png');
        imagepng($captchaImg);
        imagedestroy($captchaImg);
        die;
    }
}
