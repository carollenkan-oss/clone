# Maramani Clone - Quick Start Guide

Get up and running in 5 minutes!

## Step 1: Install & Start (2 minutes)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at: `http://localhost:5173`

## Step 2: Explore the Features (3 minutes)

### Try the Shop
1. Click "Shop" in the navigation
2. Use filters:
   - Filter by **Category**: Residential, Commercial, Apartments
   - Filter by **Bedrooms**: 1, 2, 3, 4, 5+
   - Filter by **Floors**: 1, 2, 3+
   - Filter by **Price Range**: Try "Under $150" or "$300-$500"
3. Search by typing plan name or ID
4. Sort by price or featured

### View Product Details
1. Click on any plan card
2. See full specifications (bedrooms, bathrooms, area, etc.)
3. View multiple images in the gallery
4. Select file type (PDF or CAD+PDF)
5. Add drawing sets (architectural, structural, etc.)
6. See price update in real-time
7. Click "Buy Now" to add to cart

### Build a Custom Home
1. Click "Custom Plan" in navigation
2. Set number of floors (1-5)
3. Set number of bedrooms (1-5)
4. Add custom rooms from dropdown
5. See area calculate automatically
6. Select drawing sets
7. Choose quality level (Basic, Standard, Luxury)
8. See construction cost estimate
9. Click "Buy Now" to add to cart

### Test the Cart
1. Click the cart icon (top right)
2. See items with prices
3. Adjust quantities with +/- buttons
4. Remove items with X button
5. See total update automatically

### Complete a Checkout
1. Click "Proceed to Checkout"
2. **Step 1:** Enter your name, email, phone
3. Click "Continue"
4. **Step 2:** Enter shipping address (street, city, zip)
5. Click "Continue"
6. **Step 3:** Select payment method
7. See order summary
8. Click "Complete Order"
9. See confirmation page with order ID

## Key Features to Try

### 1. Advanced Filtering
Combine multiple filters:
- "Show me residential homes under $300 with 3+ bedrooms"
- "Find all commercial buildings under $500"
- "Show 2-bedroom apartments under $600"

### 2. Price Calculation
On product detail page:
- Switch between PDF and CAD+PDF (price updates)
- Add drawing sets one by one (price increases)
- Watch total update in real-time

### 3. Cart Persistence
- Add items to cart
- Refresh the page
- Items are still there! (localStorage)

### 4. Custom Planning
- Create a 2-story 4-bedroom house
- Add extra rooms
- See cost estimate for construction
- Compare different quality levels

## Common Tasks

### Find a Specific Plan
1. Use search box: "ID 39801" or "Office Building"
2. Results appear instantly

### Filter by Budget
1. Shop → Click Filters
2. Choose "Price Range"
3. Select your budget tier
4. See matching plans instantly

### Compare Prices
1. Shop page shows base prices
2. Product detail shows all pricing options
3. Cart shows running total

### Check Order Details
1. Complete checkout
2. See order ID in confirmation
3. Order details in browser console (for MVP)
4. Orders stored in localStorage

## File Organization

```
src/
├── pages/              # Page components
│   ├── Shop.tsx        ← Browse & filter plans
│   ├── ProductDetail.tsx ← View plan details
│   ├── Cart.tsx        ← Shopping cart
│   ├── Checkout.tsx    ← Multi-step checkout
│   ├── CustomPlan.tsx  ← Build custom home
│   └── ...
├── components/         # Reusable components
├── contexts/          # Cart & Auth state
├── data/              # Sample plans (26 total)
├── types/             # TypeScript types
└── App.tsx            # Main app component
```

## Configuration

### Change Tax Rate
File: `src/pages/Checkout.tsx`
```typescript
const TAX_RATE = 0.16; // Change 16% to your rate
```

### Update Price Ranges
File: `src/pages/Shop.tsx`
```typescript
const priceRanges = [
  { label: 'Under $150', min: 0, max: 150 },
  { label: '$150 - $300', min: 150, max: 300 },
  // ... add or modify ranges
];
```

### Add New Plans
File: `src/data/samplePlans.ts`
```typescript
export const samplePlans: HousePlan[] = [
  // ... existing plans
  {
    id: '27',
    plan_id: '50000',
    title: 'My New Plan',
    // ... copy structure from existing plans
  }
];
```

## Useful Links

- [Vite Docs](https://vitejs.dev) - Build tool
- [React Docs](https://react.dev) - Framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - Components
- [TypeScript](https://www.typescriptlang.org) - Language

## Next Steps for Production

1. **Add Database** → See SUPABASE_SETUP.md
2. **Add Payments** → Integrate Stripe or PesaPal
3. **Add Auth** → Supabase Auth integration
4. **Deploy** → Push to Vercel or your host

## Troubleshooting

### Port 5173 in use?
```bash
npm run dev -- --port 3000
```

### Dependencies not installing?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors?
```bash
npm run build
```

## Project Stats

- **26 House Plans** - across 4 categories
- **4 Filter Types** - category, bedrooms, floors, price
- **6 Price Ranges** - flexible filtering
- **4 Checkout Steps** - complete flow
- **10 Room Types** - for custom plans
- **6 Drawing Sets** - add-on options
- **3 Payment Methods** - ready for integration

## Time Estimates for Features

| Feature | Implementation Time |
|---------|-------------------|
| Setup & run locally | < 1 min |
| Browse & filter | < 2 min |
| View product details | < 3 min |
| Build custom plan | < 3 min |
| Complete checkout | < 4 min |
| **Total exploration** | **< 5 min** |

## Demo Credentials

### Sample Product IDs
- `39801` - Office Building
- `24411` - 4-Bedroom House
- `13418` - 3-Bedroom House
- `11001` - 1-Bedroom Studio
- `40503` - 2-Bed Apartment Building

### Sample Checkout Data
- **Name:** John Doe
- **Email:** john@example.com
- **Phone:** +254 700 000000
- **Address:** 123 Main Street
- **City:** Nairobi
- **Zip:** 00100

## Key Statistics

### Data Coverage
- **Bedroom Range:** 0-20 beds
- **Floor Range:** 1-5 floors
- **Area Range:** 48-750 m²
- **Price Range:** $95-$2479
- **Categories:** 4 (Residential, Commercial, Hotels, Apartments)
- **Styles:** 5 (Modern, Contemporary, Farmhouse, African, etc.)

### Categories Breakdown
- **Residential:** 13 plans (homes & villas)
- **Commercial:** 4 plans (shops, clinics, restaurants, offices)
- **Hotels:** 1 plan (hospitality)
- **Apartments:** 3 plans (multi-unit buildings)
- **Unknown:** 5 plans (mixed types)

## FAQ

**Q: Can I use this in production?**
A: Yes for MVP. Needs payment integration + database for production.

**Q: How do I add my own plans?**
A: Edit `src/data/samplePlans.ts` and follow the structure.

**Q: Where is my data saved?**
A: Cart and orders saved to browser localStorage (demo only).

**Q: How do I add a real payment gateway?**
A: See SUPABASE_SETUP.md and integrate Stripe/PesaPal.

**Q: Can I customize the checkout?**
A: Yes! Edit `src/pages/Checkout.tsx` to modify steps/fields.

**Q: How do I deploy this?**
A: Run `npm run build`, then upload `dist/` folder to any host.

---

**Ready to get started?** Run `npm install && npm run dev` and explore! 🚀
