-- backend/database/seeders/002_transactions_seeder.sql
-- Sample transactions data (runs SECOND, after users exist)
INSERT INTO transactions (user_id, type, amount, category, description, date, created_at, updated_at) VALUES
    -- John Doe's transactions (user_id: 1)
    (1, 'income', 5000.00, 'income', 'Monthly salary', '2025-01-01', '2025-01-01 10:30:00', '2025-01-01 10:30:00'),
    (1, 'expense', 1200.00, 'housing', 'Monthly rent payment', '2025-01-02', '2025-01-02 09:00:00', '2025-01-02 09:00:00'),
    (1, 'expense', 300.00, 'food', 'Grocery shopping at Safeway', '2025-01-03', '2025-01-03 14:30:00', '2025-01-03 14:30:00'),
    (1, 'expense', 150.00, 'utilities', 'Electricity bill', '2025-01-05', '2025-01-05 16:00:00', '2025-01-05 16:00:00'),
    (1, 'expense', 80.00, 'transportation', 'Gas for car', '2025-01-07', '2025-01-07 18:00:00', '2025-01-07 18:00:00'),
    (1, 'expense', 45.00, 'entertainment', 'Movie tickets', '2025-01-10', '2025-01-10 20:00:00', '2025-01-10 20:00:00'),
    
    -- Jane Smith's transactions (user_id: 2)
    (2, 'income', 4500.00, 'income', 'Freelance project payment', '2025-01-01', '2025-01-01 11:30:00', '2025-01-01 11:30:00'),
    (2, 'expense', 800.00, 'housing', 'Mortgage payment', '2025-01-01', '2025-01-01 12:00:00', '2025-01-01 12:00:00'),
    (2, 'expense', 250.00, 'food', 'Restaurant dinner', '2025-01-04', '2025-01-04 19:30:00', '2025-01-04 19:30:00'),
    (2, 'expense', 120.00, 'healthcare', 'Doctor visit co-pay', '2025-01-06', '2025-01-06 10:00:00', '2025-01-06 10:00:00'),
    (2, 'expense', 200.00, 'shopping', 'Clothing purchase', '2025-01-08', '2025-01-08 15:00:00', '2025-01-08 15:00:00'),
    
    -- Bob Johnson's transactions (user_id: 3)
    (3, 'income', 6000.00, 'income', 'Senior developer salary', '2025-01-01', '2025-01-01 12:30:00', '2025-01-01 12:30:00'),
    (3, 'expense', 1500.00, 'housing', 'Rent and utilities', '2025-01-01', '2025-01-01 13:00:00', '2025-01-01 13:00:00'),
    (3, 'expense', 400.00, 'food', 'Weekly groceries', '2025-01-02', '2025-01-02 10:00:00', '2025-01-02 10:00:00'),
    (3, 'expense', 100.00, 'transportation', 'Public transit pass', '2025-01-03', '2025-01-03 08:00:00', '2025-01-03 08:00:00'),
    (3, 'expense', 300.00, 'education', 'Online course subscription', '2025-01-05', '2025-01-05 14:00:00', '2025-01-05 14:00:00'),
    
    -- Alice Brown's transactions (user_id: 4)
    (4, 'income', 3500.00, 'income', 'Part-time job salary', '2025-01-01', '2025-01-01 13:30:00', '2025-01-01 13:30:00'),
    (4, 'expense', 600.00, 'housing', 'Shared apartment rent', '2025-01-01', '2025-01-01 14:00:00', '2025-01-01 14:00:00'),
    (4, 'expense', 180.00, 'food', 'Meal prep ingredients', '2025-01-03', '2025-01-03 11:00:00', '2025-01-03 11:00:00'),
    (4, 'expense', 60.00, 'transportation', 'Uber rides', '2025-01-04', '2025-01-04 16:00:00', '2025-01-04 16:00:00'),
    (4, 'expense', 90.00, 'utilities', 'Internet bill', '2025-01-07', '2025-01-07 12:00:00', '2025-01-07 12:00:00'),
    (4, 'expense', 150.00, 'shopping', 'Home supplies', '2025-01-09', '2025-01-09 17:00:00', '2025-01-09 17:00:00'),
    
    -- Charlie Wilson's transactions (user_id: 5)
    (5, 'income', 7500.00, 'income', 'Business owner income', '2025-01-01', '2025-01-01 14:30:00', '2025-01-01 14:30:00'),
    (5, 'expense', 2000.00, 'housing', 'Mortgage and property tax', '2025-01-01', '2025-01-01 15:00:00', '2025-01-01 15:00:00'),
    (5, 'expense', 500.00, 'food', 'Family groceries', '2025-01-02', '2025-01-02 16:00:00', '2025-01-02 16:00:00'),
    (5, 'expense', 200.00, 'utilities', 'Electric, gas, water bills', '2025-01-03', '2025-01-03 09:00:00', '2025-01-03 09:00:00'),
    (5, 'expense', 350.00, 'transportation', 'Car payment and insurance', '2025-01-04', '2025-01-04 11:00:00', '2025-01-04 11:00:00'),
    (5, 'expense', 250.00, 'healthcare', 'Family health insurance', '2025-01-05', '2025-01-05 13:00:00', '2025-01-05 13:00:00'),
    (5, 'expense', 400.00, 'entertainment', 'Family vacation fund', '2025-01-06', '2025-01-06 15:00:00', '2025-01-06 15:00:00'),
    (5, 'expense', 180.00, 'education', 'Kids school supplies', '2025-01-08', '2025-01-08 10:00:00', '2025-01-08 10:00:00'),
    (5, 'expense', 120.00, 'other', 'Miscellaneous expenses', '2025-01-10', '2025-01-10 14:00:00', '2025-01-10 14:00:00')
ON CONFLICT DO NOTHING;