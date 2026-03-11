import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';
import { ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit/Debit Card', description: 'Visa, Mastercard, American Express' },
  { id: 'mobile', label: 'Mobile Money', description: 'M-Pesa, Airtel Money' },
  { id: 'bank', label: 'Bank Transfer', description: 'Direct bank deposit' },
];

const TAX_RATE = 0.16; // 16% tax

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: customer info, 2: shipping, 3: payment, 4: confirmation
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [form, setForm] = useState({
    name: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipcode: '',
  });

  const tax = totalPrice * TAX_RATE;
  const total = totalPrice + tax;

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
    if (!form.name || !form.email || !form.phone) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (step === 1) {
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!form.address || !form.city || !form.zipcode) {
        toast.error('Please fill in all address fields');
        return;
      }
      setStep(3);
      return;
    }
    if (step === 3) {
      setLoading(true);
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mock order
      const orderId = `ORD-${Date.now()}`;
      const order = {
        id: orderId,
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone,
        subtotal: totalPrice,
        tax: tax,
        total: total,
        items: items,
        payment_method: paymentMethod,
        status: 'CONFIRMED',
      };
      
      // Store in localStorage for demo purposes
      const orders = JSON.parse(localStorage.getItem('maramani-orders') || '[]');
      orders.push({ ...order, created_at: new Date().toISOString() });
      localStorage.setItem('maramani-orders', JSON.stringify(orders));
      
      setOrderPlaced(true);
      setLoading(false);
      setStep(4);
      clearCart();
    }
  };

  if (orderPlaced && step === 4) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
          <h1 className="mt-6 text-3xl font-display font-bold">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">Thank you for your purchase. A confirmation email has been sent to {form.email}.</p>
          <div className="mt-8 bg-card border rounded-lg p-6 text-left max-w-md mx-auto">
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="text-lg font-bold">ORD-{Date.now()}</p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax (16%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="border-t pt-2 flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="mt-8 space-x-3">
            <Button asChild><Link to="/shop">Continue Shopping</Link></Button>
            <Button asChild variant="outline"><Link to="/">Back to Home</Link></Button>
          </div>
        </div>
      </Layout>
    );
  }

  const stepTitles = ['Customer Info', 'Shipping Address', 'Payment', 'Confirmation'];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-display font-bold">Checkout</h1>

        {/* Progress Indicator */}
        <div className="mt-8 flex gap-2 md:gap-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1">
              <div className={`h-2 rounded-full ${s <= step ? 'bg-primary' : 'bg-muted'}`} />
              <p className="text-xs mt-1 text-muted-foreground text-center">{stepTitles[s - 1]}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Step 1: Customer Info */}
            {step === 1 && (
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <h2 className="font-semibold text-lg">Customer Information</h2>
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+254 700 000000" required />
                </div>
              </div>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <h2 className="font-semibold text-lg">Shipping Address</h2>
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input id="address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="123 Main Street" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="Nairobi" required />
                  </div>
                  <div>
                    <Label htmlFor="zip">Postal Code *</Label>
                    <Input id="zip" value={form.zipcode} onChange={e => setForm({ ...form, zipcode: e.target.value })} placeholder="00100" required />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <h2 className="font-semibold text-lg">Payment Method</h2>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => (
                    <label key={method.id} className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === method.id ? 'border-primary bg-primary/5' : 'hover:bg-secondary'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="h-4 w-4 mt-1 text-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{method.label}</p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">This is a demo. In production, this would integrate with real payment providers like Stripe, PesaPal, or M-Pesa.</p>
                </div>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full font-semibold" disabled={loading}>
              {loading ? 'Processing...' : step === 3 ? `Complete Order - $${total.toFixed(2)}` : 'Continue'}
            </Button>
            
            {step > 1 && (
              <Button type="button" variant="outline" size="lg" className="w-full" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-card border rounded-lg p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded overflow-hidden bg-muted flex-shrink-0">
                      {item.mainImage && <img src={item.mainImage} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.fileType === 'CAD_PDF' ? 'CAD + PDF' : 'PDF'}</p>
                      <p className="text-sm font-bold text-primary">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t space-y-2 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (16%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
