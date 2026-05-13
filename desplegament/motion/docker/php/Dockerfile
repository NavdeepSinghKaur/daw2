FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libzip-dev

RUN docker-php-ext-install pdo pdo_mysql mysqli gd zip

WORKDIR /var/www/html
