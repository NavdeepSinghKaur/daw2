<?php

if (session()->get('email') !== null) {
    session()->destroy();
}
base_url('Home');
?>

