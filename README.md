# Maramani House Plans Clone - Full Stack Application

A modern, fully-featured house design and architecture blueprint marketplace built with React, TypeScript, and Tailwind CSS. This is a complete clone of maramani.com with extended functionality and database integration.

## Overview

This project provides a complete e-commerce platform for selling architectural house plans with:
- **26+ diverse house plans** across residential, commercial, and apartment categories
- **Advanced filtering** by category, bedrooms, floors, and price range
- **Multi-step checkout** with customer info, shipping, and payment
- **Order management** with localStorage persistence (upgradeable to database)
- **Responsive design** for mobile, tablet, and desktop
- **Modern UI** built with shadcn/ui components and Tailwind CSS

## Project Structure

```
src/
├── pages/              # Page components
│   ├── Index.tsx      # Homepage
│   ├── Shop.tsx       # Product listing with filters
│   ├── ProductDetail.tsx  # Individual plan details
│   ├── Cart.tsx       # Shopping cart
│   ├── Checkout.tsx   # Multi-step checkout
│   ├── CustomPlan.tsx # Custom design request form
│   ├── SignIn.tsx     # User login
│   ├── SignUp.tsx     # User registration
│   ├── Admin.tsx      # Admin dashboard
│   └── NotFound.tsx   # 404 page
├── components/        # Reusable React components
│   ├── shop/          # Shop-specific components
│   ├── layout/        # Layout components
│   └── ui/            # shadcn/ui components
├── contexts/          # React Context for global state
│   ├── CartContext.tsx
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── services/          # API and utility services
├── data/              # Static data (sample plans)
├── types/             # TypeScript type definitions
└── styles/            # Global styles and Tailwind config
```

## Getting Started

### Prerequisites
- Node.js 16+ (recommended: install with [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn package manager
- Supabase account (for database integration)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd maramani-clone

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Add your Supabase credentials (optional)
# VITE_SUPABASE_URL=your_url
# VITE_SUPABASE_ANON_KEY=your_key

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Features Implemented

### ✅ Shopping & Browsing
- Browse 26+ house plans with high-quality images
- Filter by:
  - Product category (Residential, Commercial, Apartments, Hotels)
  - Number of bedrooms (1-6+)
  - Number of floors (1-3+)
  - Price range ($0-$2000+)
- Sort by featured, price (low-high, high-low), newest
- Search by plan title or ID
- Detailed product pages with:
  - Multiple images gallery
  - Full specifications (width, length, area)
  - Room list and features
  - Drawing set options with pricing
  - File type selection (PDF only or CAD+PDF)

### ✅ Shopping Cart
- Add plans with customizable drawing sets
- Quantity management (add/remove items)
- Persistent storage (localStorage)
- Real-time price calculations
- Quick cart summary

### ✅ Checkout Flow
- **Step 1**: Customer information (name, email, phone)
- **Step 2**: Shipping address (street, city, postal code)
- **Step 3**: Payment method selection
- **Step 4**: Order confirmation
- Tax calculation (16% by default)
- Order summary with itemized breakdown
- Mock payment processing
- Order confirmation with order ID

### ✅ Data Management
- 26 diverse house plans across multiple categories
- Structured TypeScript types for all data
- Sample data includes:
  - Residential homes (1-6+ bedrooms)
  - Commercial buildings (offices, retail, clinics)
  - Multi-family apartments
  - Hotel designs

### ✅ User Interface
- Responsive design (mobile, tablet, desktop)
- Modern dark/light theme support
- Loading states and error handling
- Toast notifications for user feedback
- Accessible components (ARIA labels, keyboard navigation)
- Smooth animations and transitions

## Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and state management
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

### Backend & Database (Ready for Integration)
- **Supabase** - PostgreSQL database with Auth
- **TypeScript services** - API integration layer

## Key Files

### Pages
- `Shop.tsx` - Shopping page with filtering and sorting (26 plans)
- `ProductDetail.tsx` - Plan details with image gallery and options
- `Cart.tsx` - Shopping cart management
- `Checkout.tsx` - Multi-step checkout process
- `CustomPlan.tsx` - Custom design request form
- `Index.tsx` - Homepage with featured plans

### Contexts & Services
- `CartContext.tsx` - Cart state management
- `AuthContext.tsx` - User authentication
- `samplePlans.ts` - 26 house plan data

### Data
- **26 House Plans** with:
  - Residential: 1-6 bedroom homes across multiple styles
  - Commercial: Shops, clinics, restaurants, offices
  - Apartments: Multi-unit apartment buildings
  - Hotels: Large commercial lodging

## Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Supabase (Optional - for database integration)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# API URLs (if needed)
VITE_API_URL=http://localhost:3000
```

## Customization

### Updating House Plans
Edit `/src/data/samplePlans.ts` to:
- Add new plans
- Modify pricing
- Change categories and styles
- Update images and descriptions

### Styling
- Modify colors in `/src/index.css` (CSS variables)
- Update Tailwind config in `tailwind.config.js`
- Override component styles in respective component files

### Checkout Settings
In `/src/pages/Checkout.tsx`:
- Adjust tax rate: `const TAX_RATE = 0.16`
- Add payment methods
- Modify checkout steps

## Database Integration (Optional)

See `SUPABASE_SETUP.md` for comprehensive database setup instructions including:
- Creating PostgreSQL tables
- Seeding sample data
- Setting up authentication
- Configuring Row Level Security

## Future Enhancements

Planned features for production:
1. **Real Payment Integration** - Stripe, PesaPal, M-Pesa
2. **User Accounts** - Registration, login, order history
3. **Admin Dashboard** - Plan management, order tracking, analytics
4. **Database Backend** - Supabase PostgreSQL for persistence
5. **File Delivery** - Automatic download/email of purchased plans
6. **Reviews System** - Customer ratings and feedback
7. **Wishlist** - Save favorite plans
8. **Email Notifications** - Order confirmations and updates
9. **Custom Requests** - Handle custom design inquiries
10. **Analytics** - Track popular plans, conversion rates

## Deployment

### Deploy to Vercel (Recommended)

```sh
# Vercel CLI is recommended
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting service
3. Set up environment variables in your hosting provider

## Performance

- Optimized images with lazy loading
- Code splitting with Vite
- Efficient component rendering with React
- Tailwind CSS for minimal CSS payload
- Client-side filtering for instant results

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is a demonstration/educational project inspired by maramani.com.

## Support & Troubleshooting

### Common Issues

**Port 5173 already in use:**
```sh
npm run dev -- --port 3000
```

**Module not found errors:**
```sh
npm install
npm run dev
```

**Build errors:**
```sh
npm run build
```

For more help, check the [v0 Documentation](https://v0.dev) or file an issue in the repository.

## Learn More

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
