# Supabase Database Setup Guide

This guide will help you set up the Maramani.com clone with a fully functional Supabase PostgreSQL database.

## Prerequisites

- Supabase account (https://supabase.com)
- Supabase CLI installed (optional but recommended)
- Your Supabase project URL and API key (available in project settings)

## Step 1: Create Tables

Copy and paste the following SQL into your Supabase SQL Editor to create all necessary tables:

```sql
-- House Plans Table
CREATE TABLE IF NOT EXISTS house_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_desc TEXT,
  floors INTEGER DEFAULT 1,
  bedrooms INTEGER DEFAULT 1,
  bathrooms INTEGER DEFAULT 1,
  width DECIMAL(10, 2),
  length DECIMAL(10, 2),
  area INTEGER,
  base_price DECIMAL(10, 2),
  cad_pdf_price DECIMAL(10, 2),
  category VARCHAR(50),
  style VARCHAR(50),
  budget_range VARCHAR(50),
  main_image TEXT,
  images TEXT[],
  has_architectural BOOLEAN DEFAULT TRUE,
  has_structural BOOLEAN DEFAULT TRUE,
  has_mechanical BOOLEAN DEFAULT FALSE,
  has_electrical BOOLEAN DEFAULT TRUE,
  has_boq BOOLEAN DEFAULT TRUE,
  has_interior BOOLEAN DEFAULT FALSE,
  architectural_price DECIMAL(10, 2),
  structural_price DECIMAL(10, 2),
  mechanical_price DECIMAL(10, 2),
  electrical_price DECIMAL(10, 2),
  boq_price DECIMAL(10, 2),
  interior_price DECIMAL(10, 2),
  rooms_included TEXT[],
  features TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_customizable BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_house_plans_category ON house_plans(category);
CREATE INDEX idx_house_plans_slug ON house_plans(slug);
CREATE INDEX idx_house_plans_featured ON house_plans(is_featured);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  full_name VARCHAR(255),
  phone VARCHAR(20),
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  subtotal DECIMAL(10, 2),
  tax DECIMAL(10, 2),
  total DECIMAL(10, 2),
  payment_status VARCHAR(20) DEFAULT 'PENDING',
  payment_method VARCHAR(50),
  pesapal_order_id VARCHAR(100),
  paid_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  house_plan_id UUID NOT NULL REFERENCES house_plans(id),
  file_type VARCHAR(20),
  include_architectural BOOLEAN DEFAULT FALSE,
  include_structural BOOLEAN DEFAULT FALSE,
  include_mechanical BOOLEAN DEFAULT FALSE,
  include_electrical BOOLEAN DEFAULT FALSE,
  include_boq BOOLEAN DEFAULT FALSE,
  include_interior BOOLEAN DEFAULT FALSE,
  unit_price DECIMAL(10, 2),
  total_price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Cart Items Table (for temporary cart storage)
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id VARCHAR(100),
  house_plan_id UUID NOT NULL REFERENCES house_plans(id),
  file_type VARCHAR(20),
  quantity INTEGER DEFAULT 1,
  price DECIMAL(10, 2),
  drawing_sets JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Custom Plan Requests Table
CREATE TABLE IF NOT EXISTS custom_plan_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  specifications JSONB,
  budget DECIMAL(10, 2),
  timeline VARCHAR(50),
  reference_files TEXT[],
  status VARCHAR(20) DEFAULT 'PENDING',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_custom_requests_email ON custom_plan_requests(customer_email);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  house_plan_id UUID NOT NULL REFERENCES house_plans(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  customer_name VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Wishlist Table
CREATE TABLE IF NOT EXISTS wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  house_plan_id UUID NOT NULL REFERENCES house_plans(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, house_plan_id)
);

-- Enable RLS (Row Level Security) for security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_plan_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
```

## Step 2: Add Sample Data

Use the provided seed data to populate your database. You can create a Node.js script or manually insert data using the Supabase dashboard.

### Using Supabase CLI (Recommended)

1. Export the sample plans from your React app
2. Create a seed file: `scripts/seed.ts`
3. Run: `supabase db push && npx ts-node scripts/seed.ts`

### Manual Import

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query and paste sample data insertion statements
4. Execute the query

## Step 3: Configure Environment Variables

Update your `.env.local` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

You can find these values in your Supabase project settings under "API".

## Step 4: Enable Authentication (Optional)

To enable user signup/login:

1. In Supabase dashboard, go to Authentication → Providers
2. Enable Email/Password authentication
3. Configure email templates (optional)
4. Update your app's auth service to use Supabase auth

## Step 5: Create API Integration

Create a service to interact with Supabase:

```typescript
// src/services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Step 6: Migrate Cart & Orders to Database

Update your cart context and checkout to use Supabase instead of localStorage:

```typescript
// Save order to database
const { data, error } = await supabase
  .from('orders')
  .insert([{
    order_number: `ORD-${Date.now()}`,
    customer_email: form.email,
    customer_name: form.name,
    customer_phone: form.phone,
    subtotal: totalPrice,
    tax: tax,
    total: total,
    status: 'CONFIRMED',
    payment_status: 'PENDING'
  }])
```

## Step 7: Set Up Row Level Security Policies

For added security, create RLS policies:

```sql
-- Allow anyone to read house_plans
CREATE POLICY "Public can read house_plans"
  ON house_plans FOR SELECT
  USING (TRUE);

-- Allow authenticated users to read their own orders
CREATE POLICY "Users can read their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Allow authenticated admins to manage everything
CREATE POLICY "Admins can manage orders"
  ON orders FOR ALL
  USING (auth.jwt() ->> 'is_admin' = 'true');
```

## Database Schema Overview

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `house_plans` | Store all design plans | id, plan_id, title, price, category, bedrooms |
| `users` | User accounts | id, email, password_hash, is_admin |
| `orders` | Customer orders | id, user_id, customer_email, total, status |
| `order_items` | Line items in orders | id, order_id, house_plan_id, quantity |
| `cart_items` | Temporary shopping cart | id, user_id, house_plan_id, quantity |
| `custom_plan_requests` | Custom design requests | id, customer_email, specifications, status |
| `reviews` | Product reviews | id, house_plan_id, rating, comment |
| `wishlist` | Saved favorites | id, user_id, house_plan_id |

## Troubleshooting

**Issue**: Connection refused
- **Solution**: Check that your Supabase URL and API key are correct

**Issue**: Permission denied when inserting data
- **Solution**: Check RLS policies and ensure you're using the correct auth context

**Issue**: Foreign key errors
- **Solution**: Ensure parent tables (house_plans, users) have data before inserting child records

## Next Steps

1. Integrate Supabase with your React components
2. Add user authentication
3. Migrate orders to use the database
4. Set up payment processing (PesaPal, Stripe, etc.)
5. Create admin dashboard with database queries
6. Add email notifications on order placement

For more help, visit the [Supabase documentation](https://supabase.com/docs).
