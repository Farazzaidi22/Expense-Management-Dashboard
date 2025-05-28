-- backend/database/seeders/001_users_seeder.sql
-- Sample users data (runs FIRST)
INSERT INTO users (name, email, created_at, updated_at) VALUES
    ('John Doe', 'john.doe@example.com', '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
    ('Jane Smith', 'jane.smith@example.com', '2025-01-01 11:00:00', '2025-01-01 11:00:00'),
    ('Bob Johnson', 'bob.johnson@example.com', '2025-01-01 12:00:00', '2025-01-01 12:00:00'),
    ('Alice Brown', 'alice.brown@example.com', '2025-01-01 13:00:00', '2025-01-01 13:00:00'),
    ('Charlie Wilson', 'charlie.wilson@example.com', '2025-01-01 14:00:00', '2025-01-01 14:00:00')
ON CONFLICT (email) DO NOTHING;