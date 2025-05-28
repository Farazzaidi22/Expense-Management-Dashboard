# backend/scripts/setup.sh
#!/bin/bash

# Wait for database to be ready
echo "Waiting for database..."
until nc -z $DB_HOST $DB_PORT; do
  sleep 1
done
echo "Database is ready!"

# Run database migrations
echo "Running database migrations..."
php scripts/migrate.php

echo "Starting Apache..."
apache2-foreground