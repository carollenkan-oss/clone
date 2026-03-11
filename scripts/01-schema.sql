-- Create house_plans table
CREATE TABLE IF NOT EXISTS house_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_desc VARCHAR(500),
  floors INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  width DECIMAL(10, 2) NOT NULL,
  length DECIMAL(10, 2) NOT NULL,
  area DECIMAL(10, 2) NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL,
  cad_pdf_price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  style VARCHAR(100),
  budget_range VARCHAR(100),
  main_image VARCHAR(500) NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  has_architectural BOOLEAN DEFAULT false,
  has_structural BOOLEAN DEFAULT false,
  has_mechanical BOOLEAN DEFAULT false,
  has_electrical BOOLEAN DEFAULT false,
  has_boq BOOLEAN DEFAULT false,
  has_interior BOOLEAN DEFAULT false,
  architectural_price DECIMAL(10, 2),
  structural_price DECIMAL(10, 2),
  mechanical_price DECIMAL(10, 2),
  electrical_price DECIMAL(10, 2),
  boq_price DECIMAL(10, 2),
  interior_price DECIMAL(10, 2),
  rooms_included TEXT[] DEFAULT ARRAY[]::TEXT[],
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_customizable BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  password_hash VARCHAR(255),
  is_admin BOOLEAN DEFAULT false,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'PENDING',
  payment_method VARCHAR(100),
  pesapal_order_id VARCHAR(255),
  paid_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'PENDING',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  house_plan_id UUID NOT NULL REFERENCES house_plans(id) ON DELETE RESTRICT,
  file_type VARCHAR(50) DEFAULT 'PDF_ONLY',
  include_architectural BOOLEAN DEFAULT false,
  include_structural BOOLEAN DEFAULT false,
  include_mechanical BOOLEAN DEFAULT false,
  include_electrical BOOLEAN DEFAULT false,
  include_boq BOOLEAN DEFAULT false,
  include_interior BOOLEAN DEFAULT false,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  house_plan_id UUID NOT NULL REFERENCES house_plans(id) ON DELETE CASCADE,
  file_type VARCHAR(50) DEFAULT 'PDF_ONLY',
  include_architectural BOOLEAN DEFAULT false,
  include_structural BOOLEAN DEFAULT false,
  include_mechanical BOOLEAN DEFAULT false,
  include_electrical BOOLEAN DEFAULT false,
  include_boq BOOLEAN DEFAULT false,
  include_interior BOOLEAN DEFAULT false,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create custom_plan_requests table
CREATE TABLE IF NOT EXISTS custom_plan_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  bedrooms INTEGER,
  bathrooms INTEGER,
  budget DECIMAL(10, 2),
  description TEXT NOT NULL,
  attachments TEXT[] DEFAULT ARRAY[]::TEXT[],
  status VARCHAR(50) DEFAULT 'PENDING',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  house_plan_id UUID NOT NULL REFERENCES house_plans(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  house_plan_id UUID NOT NULL REFERENCES house_plans(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, house_plan_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_house_plans_category ON house_plans(category);
CREATE INDEX IF NOT EXISTS idx_house_plans_style ON house_plans(style);
CREATE INDEX IF NOT EXISTS idx_house_plans_bedrooms ON house_plans(bedrooms);
CREATE INDEX IF NOT EXISTS idx_house_plans_is_featured ON house_plans(is_featured);
CREATE INDEX IF NOT EXISTS idx_house_plans_is_active ON house_plans(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_session_id ON cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_reviews_house_plan_id ON reviews(house_plan_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);

-- Enable RLS (Row Level Security)
ALTER TABLE house_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_plan_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- RLS Policies for house_plans (public read)
CREATE POLICY "house_plans_select_policy" ON house_plans
  FOR SELECT USING (is_active = true);

-- RLS Policies for users (users can view own profile)
CREATE POLICY "users_select_own_policy" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_update_own_policy" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for orders (users can view own orders)
CREATE POLICY "orders_select_own_policy" ON orders
  FOR SELECT USING (auth.uid() = user_id OR auth.uid()::text = customer_email);

-- RLS Policies for cart_items (users can manage own cart)
CREATE POLICY "cart_items_select_own_policy" ON cart_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "cart_items_insert_own_policy" ON cart_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "cart_items_update_own_policy" ON cart_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "cart_items_delete_own_policy" ON cart_items
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for reviews (public read, users can manage own)
CREATE POLICY "reviews_select_policy" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "reviews_insert_policy" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid()::text = customer_email);

-- RLS Policies for custom_plan_requests (users can view own)
CREATE POLICY "custom_plan_requests_select_own_policy" ON custom_plan_requests
  FOR SELECT USING (auth.uid() = user_id OR auth.uid()::text = email);

CREATE POLICY "custom_plan_requests_insert_policy" ON custom_plan_requests
  FOR INSERT WITH CHECK (true);
