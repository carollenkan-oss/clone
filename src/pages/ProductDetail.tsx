import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, BedDouble, Bath, Ruler, Move, Maximize2, Truck, ShieldCheck, CreditCard, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import Layout from '@/components/layout/Layout';
import { samplePlans } from '@/data/samplePlans';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const plan = samplePlans.find(p => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [fileType, setFileType] = useState<'PDF_ONLY' | 'CAD_PDF'>('CAD_PDF');
  const [drawingSets, setDrawingSets] = useState({
    architectural: true,
    structural: false,
    mechanical: false,
    electrical: false,
    boq: false,
    interior: false,
  });

  const price = useMemo(() => {
    if (!plan) return 0;
    let p = fileType === 'CAD_PDF' ? plan.cad_pdf_price : plan.base_price;
    if (drawingSets.structural && plan.structural_price) p += plan.structural_price;
    if (drawingSets.mechanical && plan.mechanical_price) p += plan.mechanical_price;
    if (drawingSets.electrical && plan.electrical_price) p += plan.electrical_price;
    if (drawingSets.boq && plan.boq_price) p += plan.boq_price;
    if (drawingSets.interior && plan.interior_price) p += plan.interior_price;
    return p;
  }, [plan, fileType, drawingSets]);

  if (!plan) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Plan not found</h1>
          <Button asChild className="mt-4"><Link to="/shop">Back to Shop</Link></Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: `${plan.id}-${fileType}-${Date.now()}`,
      housePlanId: plan.id,
      title: plan.title,
      planId: plan.plan_id,
      mainImage: plan.main_image,
      fileType,
      drawingSets,
      price,
      quantity: 1,
    });
    toast.success('Added to cart!');
  };

  const specs = [
    { icon: Building2, value: plan.floors, label: plan.floors === 1 ? 'Floor' : 'Floors' },
    { icon: BedDouble, value: plan.bedrooms, label: plan.bedrooms === 1 ? 'Bedroom' : 'Bedrooms' },
    { icon: Bath, value: plan.bathrooms, label: plan.bathrooms === 1 ? 'Bathroom' : 'Bathrooms' },
    { icon: Ruler, value: `${plan.width} m`, label: 'Width' },
    { icon: Move, value: `${plan.length} m`, label: 'Length' },
    { icon: Maximize2, value: `${plan.area}`, label: 'Area' },
  ];

  const drawingOptions = [
    { key: 'architectural', label: 'Architectural Drawings', price: plan.architectural_price, available: plan.has_architectural },
    { key: 'structural', label: 'Structural Drawings', price: plan.structural_price, available: plan.has_structural },
    { key: 'mechanical', label: 'Mechanical Drawings', price: plan.mechanical_price, available: plan.has_mechanical },
    { key: 'electrical', label: 'Electrical Drawings', price: plan.electrical_price, available: plan.has_electrical },
    { key: 'boq', label: 'Bill of Quantities', price: plan.boq_price, available: plan.has_boq },
    { key: 'interior', label: 'Interior Design', price: plan.interior_price, available: plan.has_interior },
  ].filter(d => d.available);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-2 w-20">
              {plan.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-primary' : 'border-transparent hover:border-border'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={plan.images[selectedImage] || plan.main_image}
                alt={plan.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">{plan.title}</h1>

            {/* Specs */}
            <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-3">
              {specs.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center py-3 bg-secondary rounded-lg text-center">
                  <Icon className="h-5 w-5 text-muted-foreground mb-1" />
                  <span className="font-semibold text-sm">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            {/* File Type */}
            <div className="mt-8 border rounded-lg p-5">
              <h3 className="font-semibold mb-3">File Type</h3>
              <div className="space-y-2">
                {[
                  { value: 'CAD_PDF' as const, label: 'CAD + PDF', desc: 'Editable DWG + PDF', price: plan.cad_pdf_price },
                  { value: 'PDF_ONLY' as const, label: 'PDF', desc: 'Standard PDF format', price: plan.base_price },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${fileType === opt.value ? 'border-primary bg-primary/5' : 'hover:bg-secondary'}`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="fileType"
                        value={opt.value}
                        checked={fileType === opt.value}
                        onChange={() => setFileType(opt.value)}
                        className="h-4 w-4 text-primary"
                      />
                      <div>
                        <div className="font-medium text-sm">{opt.label}</div>
                        <div className="text-xs text-muted-foreground">{opt.desc}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Drawing Sets */}
            <div className="mt-4 border rounded-lg p-5">
              <h3 className="font-semibold mb-3">Drawing Sets</h3>
              <div className="space-y-2">
                {drawingOptions.map(({ key, label, price: drawPrice }) => (
                  <label
                    key={key}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${drawingSets[key as keyof typeof drawingSets] ? 'border-primary bg-primary/5' : 'hover:bg-secondary'}`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={drawingSets[key as keyof typeof drawingSets]}
                        onChange={(e) => setDrawingSets({ ...drawingSets, [key]: e.target.checked })}
                        className="h-4 w-4 rounded text-primary"
                      />
                      <span className="font-medium text-sm">{label}</span>
                    </div>
                    {drawPrice && <span className="text-sm font-semibold">+${drawPrice.toFixed(2)}</span>}
                  </label>
                ))}
              </div>
            </div>

            {/* Trust */}
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[
                { icon: Truck, text: 'Instant digital delivery' },
                { icon: ShieldCheck, text: '100% Money Guarantee' },
                { icon: CreditCard, text: 'Multiple payment options' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" /> {text}
                </div>
              ))}
            </div>

            {/* Buy Button */}
            <Button onClick={handleAddToCart} size="lg" className="w-full mt-6 text-lg font-semibold py-6 bg-primary hover:bg-primary/90">
              Buy Now <span className="ml-4">${price.toFixed(2)}</span>
            </Button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 bg-card border rounded-lg p-8">
          <h2 className="text-xl font-display font-bold mb-4">Description</h2>
          <p className="text-muted-foreground leading-relaxed">{plan.description}</p>

          {plan.rooms_included.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Rooms Included</h3>
              <div className="flex flex-wrap gap-2">
                {plan.rooms_included.map((room) => (
                  <span key={room} className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">{room}</span>
                ))}
              </div>
            </div>
          )}

          {plan.features.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {plan.features.map((f) => (
                  <span key={f} className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">{f}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
