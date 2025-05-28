-- backend/database/migrations/002_create_transactions_table.sql
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    category VARCHAR(50) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_transactions_updated_at 
    BEFORE UPDATE ON transactions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add constraint to ensure valid categories
ALTER TABLE transactions ADD CONSTRAINT check_valid_categories 
CHECK (category IN (
    'income', 'food', 'transportation', 'housing', 'utilities', 
    'healthcare', 'entertainment', 'shopping', 'education', 'travel', 'other'
));

-- Add constraint to ensure income transactions use income category
ALTER TABLE transactions ADD CONSTRAINT check_income_category 
CHECK (
    (type = 'income' AND category = 'income') OR 
    (type = 'expense' AND category != 'income')
);