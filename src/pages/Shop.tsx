import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PlanCard from '@/components/shop/PlanCard';
import Layout from '@/components/layout/Layout';
import { samplePlans } from '@/data/samplePlans';

const productTypes = ['All', 'Residential', 'Commercial', 'Apartments', 'Hotels & Lodges'];
const bedroomOptions = ['Any', '1', '2', '3', '4', '5+'];
const floorOptions = ['Any', '1', '2', '3+'];
const priceRanges = [
  { label: 'Under $150', min: 0, max: 150 },
  { label: '$150 - $300', min: 150, max: 300 },
  { label: '$300 - $500', min: 300, max: 500 },
  { label: '$500 - $1000', min: 500, max: 1000 },
  { label: '$1000 - $2000', min: 1000, max: 2000 },
  { label: '$2000+', min: 2000, max: Infinity },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || 'Any');
  const [floors, setFloors] = useState('Any');
  const [priceRange, setPriceRange] = useState('Any');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPlans = useMemo(() => {
    let plans = [...samplePlans];

    if (search) {
      const q = search.toLowerCase();
      plans = plans.filter(p => p.title.toLowerCase().includes(q) || p.plan_id.includes(q));
    }
    if (category !== 'All') plans = plans.filter(p => p.category === category);
    if (bedrooms !== 'Any') {
      const b = parseInt(bedrooms);
      plans = plans.filter(p => bedrooms === '5+' ? p.bedrooms >= 5 : p.bedrooms === b);
    }
    if (floors !== 'Any') {
      const f = parseInt(floors);
      plans = plans.filter(p => floors === '3+' ? p.floors >= 3 : p.floors === f);
    }
    if (priceRange !== 'Any') {
      const range = priceRanges.find(r => r.label === priceRange);
      if (range) {
        plans = plans.filter(p => p.base_price >= range.min && p.base_price <= range.max);
      }
    }

    switch (sortBy) {
      case 'price-low': plans.sort((a, b) => a.base_price - b.base_price); break;
      case 'price-high': plans.sort((a, b) => b.base_price - a.base_price); break;
      case 'newest': plans.sort((a, b) => b.id.localeCompare(a.id)); break;
      default: plans.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }

    return plans;
  }, [search, category, bedrooms, floors, priceRange, sortBy]);

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://www.maramani.com/cdn/shop/collections/ID-12210_pp1_cleanup.png?v=1715582702&width=1920"
          alt="All Products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white">All products</h1>
          <p className="mt-3 text-white/80 max-w-2xl text-sm md:text-base">
            We're passionate about helping you bring your dream home to life. Explore our extensive collection and discover the perfect blueprint.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search plans..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-60"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="w-64 flex-shrink-0 space-y-6">
              <div>
                <h3 className="font-semibold text-sm mb-3">Product type</h3>
                <div className="space-y-2">
                  {productTypes.map((type) => (
                    <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={category === type}
                        onChange={() => setCategory(type)}
                        className="h-4 w-4 text-primary"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-3">Number of Bedrooms</h3>
                <div className="space-y-2">
                  {bedroomOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="bedrooms"
                        checked={bedrooms === opt}
                        onChange={() => setBedrooms(opt)}
                        className="h-4 w-4 text-primary"
                      />
                      {opt === 'Any' ? 'Any' : `${opt} Bedroom${opt !== '1' ? 's' : ''}`}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-3">Number of Floors</h3>
                <div className="space-y-2">
                  {floorOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="floors"
                        checked={floors === opt}
                        onChange={() => setFloors(opt)}
                        className="h-4 w-4 text-primary"
                      />
                      {opt === 'Any' ? 'Any' : `${opt} Floor${opt !== '1' ? 's' : ''}`}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === 'Any'}
                      onChange={() => setPriceRange('Any')}
                      className="h-4 w-4 text-primary"
                    />
                    Any Price
                  </label>
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange === range.label}
                        onChange={() => setPriceRange(range.label)}
                        className="h-4 w-4 text-primary"
                      />
                      {range.label}
                    </label>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filteredPlans.length} products</p>
            {filteredPlans.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg font-semibold">No plans found</p>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
