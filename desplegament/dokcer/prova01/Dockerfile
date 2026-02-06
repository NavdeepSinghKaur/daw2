# FROM: Imatge base. Partim d'una imatge oficial de PHP amb Apache integrat.
FROM php:8.2-apache

# LABEL: Metadades del contenidor (autor, versió, descripció).
LABEL author="El teu nom"
LABEL version="1.0"
LABEL description="Primer projecte Docker - Servidor PHP"

# ENV: Defineix variables d'entorn accessibles dins del contenidor.
ENV APP_NAME="La Meva Primera App Docker"
ENV APP_ENV=development

# WORKDIR: Estableix el directori de treball. Si no existeix, el crea.
WORKDIR /var/www/html

# COPY: Copia fitxers locals al contenidor.
COPY index.php .
COPY info.php .

# RUN: Executa comandes durant la construcció de la imatge.
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# EXPOSE: Documenta quin port utilitza l'aplicació (informatiu).
EXPOSE 80

# CMD: Comanda per defecte quan s'inicia el contenidor.
# En aquest cas, la imatge base ja té un CMD, així que no cal especificar-lo.
