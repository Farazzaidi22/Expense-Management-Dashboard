# backend/Dockerfile (Development - PHP Built-in Server)
FROM php:8.2-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Get Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer.json first
COPY composer.json ./

# Install PHP dependencies
RUN composer install --no-interaction

# Copy application code
COPY . .

# Create simple setup script
RUN echo '#!/bin/bash\n\
echo "Waiting for database..."\n\
until nc -z $DB_HOST $DB_PORT; do\n\
  sleep 1\n\
done\n\
echo "Database is ready!"\n\
\n\
echo "Running database migrations..."\n\
php scripts/migrate.php\n\
\n\
echo "Starting PHP development server..."\n\
php -S 0.0.0.0:80 -t public/' > /usr/local/bin/setup.sh && chmod +x /usr/local/bin/setup.sh

# Expose port 80
EXPOSE 80

# Start PHP dev server
CMD ["/usr/local/bin/setup.sh"]