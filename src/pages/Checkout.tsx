import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: user?.email || '',
    phone: '',
  });

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground/30" />
          <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
          <Button asChild className="mt-6"><Link to="/shop">Continue Shopping</Link></Button>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    // TODO: integrate PesaPal via edge function
    toast.success('Order placed! Payment integration coming soon.');
    clearCart();
    navigate('/');
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-display font-bold">Checkout</h1>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Customer Form */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h2 className="font-semibold text-lg mb-4">Customer Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+254 700 000000" />
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full font-semibold" disabled={loading}>
              {loading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-card border rounded-lg p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded overflow-hidden bg-muted flex-shrink-0">
                      {item.mainImage && <img src={item.mainImage} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.fileType === 'CAD_PDF' ? 'CAD + PDF' : 'PDF'}</p>
                      <p className="text-sm font-bold text-primary">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
