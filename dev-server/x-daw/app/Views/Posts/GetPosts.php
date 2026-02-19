<?php

foreach ($posts as $post) {
    echo "<h2>{$post->title}</h2>";
    echo "<p>{$post->text}</p>";
    echo "<hr>";
}