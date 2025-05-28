# backend/Dockerfile (Install composer dependencies at runtime)
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

# Copy all application files
COPY . .

# Create setup script that installs composer dependencies at runtime
RUN echo '#!/bin/bash\n\
echo "=== Container Startup ==="\n\
echo "Working directory: $(pwd)"\n\
echo "Files in directory:"\n\
ls -la\n\
\n\
echo "=== Installing Composer Dependencies ==="\n\
if [ ! -d "vendor" ]; then\n\
    echo "Vendor directory not found, running composer install..."\n\
    composer install --no-interaction --no-dev --optimize-autoloader\n\
else\n\
    echo "Vendor directory exists"\n\
fi\n\
\n\
echo "=== Post-Install Check ==="\n\
ls -la vendor/ || echo "Still no vendor directory!"\n\
ls -la vendor/autoload.php || echo "Still no autoload file!"\n\
\n\
echo "=== Database Setup ==="\n\
echo "Waiting for database..."\n\
until nc -z $DB_HOST $DB_PORT; do\n\
  sleep 1\n\
done\n\
echo "Database is ready!"\n\
\n\
echo "Running database migrations..."\n\
php scripts/migrate.php\n\
\n\
echo "=== Starting Server ==="\n\
echo "Starting PHP development server..."\n\
php -S 0.0.0.0:80 -t public/' > /usr/local/bin/setup.sh && chmod +x /usr/local/bin/setup.sh

# Expose port 80
EXPOSE 80

# Start PHP dev server
CMD ["/usr/local/bin/setup.sh"]