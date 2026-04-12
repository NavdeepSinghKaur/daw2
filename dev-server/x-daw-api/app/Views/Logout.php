<?php

if (session()->get('email') !== null) {
    session()->destroy();
}
$this->redirect()->to('/welcome');
?>

