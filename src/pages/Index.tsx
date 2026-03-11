import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, CreditCard, Pencil, Calculator, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlanCard from '@/components/shop/PlanCard';
import { samplePlans } from '@/data/samplePlans';
import Layout from '@/components/layout/Layout';

const features = [
  { icon: Truck, label: 'Instant digital delivery' },
  { icon: ShieldCheck, label: '100% Money Guarantee' },
  { icon: CreditCard, label: 'Multiple payment options' },
  { icon: Pencil, label: 'Customizable house plans' },
  { icon: Calculator, label: 'Construction cost estimates' },
];

const categories = [
  { title: 'Duplex & Multi-Family', image: 'https://www.maramani.com/cdn/shop/files/House_Plan_ID_22302_pp1_jpg.jpg?v=1728944911&width=720', href: '/shop?category=Apartments' },
  { title: 'Apartment Plans', image: 'https://www.maramani.com/cdn/shop/files/Perspective_1_1.jpg?v=1728940993&width=720', href: '/shop?category=Apartments' },
  { title: 'Modern Farm House', image: 'https://www.maramani.com/cdn/shop/files/ID_13404_House_plan_picture1.jpg_cleanup.webp?v=1728943109&width=720', href: '/shop?style=Farmhouse' },
  { title: 'Garage House Plans', image: 'https://www.maramani.com/cdn/shop/files/04__cleanup.webp?v=1728944458&width=720', href: '/shop?style=Traditional' },
  { title: 'Modern House Plans', image: 'https://www.maramani.com/cdn/shop/files/ID_13403_pp1_cleanup.webp?v=1728944599&width=720', href: '/shop?style=Modern' },
];

const testimonials = [
  { name: 'Ekong Richard', text: 'Very efficient, timely and money well spent. I loved the house plan and i received it immediately upon making payment.' },
  { name: 'Lutinala Nalomba', text: 'The company was responsive when I enquired about the services. The website is user friendly and easy to navigate.' },
  { name: 'Henry Wanjala', text: 'Comprehensive and fast response to my concern. Received the plans as detailed as promised, Bravo.' },
  { name: 'Samuel Berko', text: 'Details were excellent, prices unbeatable. Delivery was excellent.' },
  { name: 'Bose Mhizha', text: 'The service is impeccable. Maramani response time is very fast. Immediately after payment I received my plans.' },
];

const bedroomCategories = [
  { title: '1 Bedroom', image: 'https://www.maramani.com/cdn/shop/collections/Perspective_1_befc8dde-aea8-4e45-a8bd-aa615415e92f.jpg?v=1714127776&width=720', href: '/shop?bedrooms=1' },
  { title: '2 Bedrooms', image: 'https://www.maramani.com/cdn/shop/collections/Perspective_1_ID12209-Maramani_fc7ee819-9de6-419c-9153-4c61814aab02.jpg?v=1714130880&width=720', href: '/shop?bedrooms=2' },
  { title: '3 Bedrooms', image: 'https://www.maramani.com/cdn/shop/collections/1_0468cdfc-5072-43f4-8b8a-90621f8bfe20.jpg?v=1714128200&width=720', href: '/shop?bedrooms=3' },
  { title: '4 Bedrooms', image: 'https://www.maramani.com/cdn/shop/collections/Pers-1_3d08d602-6611-4f2d-894a-ca784fcbe2c3.jpg?v=1714128418&width=720', href: '/shop?bedrooms=4' },
  { title: '5+ Bedrooms', image: 'https://www.maramani.com/cdn/shop/collections/5-bedroom-plan-ID-25503-pp3_08c1b083-c238-462d-8b65-cf65b6a770e8.jpg?v=1714128491&width=720', href: '/shop?bedrooms=5' },
];

export default function Index() {
  const featuredPlans = samplePlans.filter(p => p.is_featured);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src="https://www.maramani.com/cdn/shop/files/Untitled_design_8_9cef7877-c64e-4ba6-83f4-2bd031e82918.webp?v=1721506831&width=1920"
          alt="Modern house"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-display font-bold text-white max-w-3xl"
          >
            Build your dream home
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-white/90 max-w-xl"
          >
            Discover over 5,000 professionally designed house plans
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex gap-4"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
              <Link to="/shop">Browse Plans</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
              <Link to="/custom-plan">Custom Plan</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 md:gap-12">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="h-5 w-5 text-primary" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to={cat.href}
                className="relative flex-shrink-0 w-52 h-64 rounded-lg overflow-hidden group"
              >
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-sm">{cat.title}</h3>
                  <span className="text-white/80 text-xs">View More</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="text-5xl md:text-6xl font-display font-bold text-primary">+5,000</span>
            <p className="mt-2 text-lg text-muted-foreground">Dream homes brought to life with Maramani</p>
          </motion.div>
        </div>
      </section>

      {/* Plans by Bedroom */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Plans for every family size</h2>
              <p className="mt-1 text-muted-foreground">Every family deserves a home that fits their needs</p>
            </div>
            <Link to="/shop" className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {bedroomCategories.map((cat) => (
              <Link key={cat.title} to={cat.href} className="group relative aspect-[3/4] rounded-lg overflow-hidden">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white font-semibold">{cat.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {testimonials.map((t) => (
              <div key={t.name} className="flex-shrink-0 w-80 bg-background border rounded-lg p-6">
                <div className="flex gap-1 mb-3">
                  {Array(5).fill(null).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">"{t.text}"</p>
                <p className="mt-4 font-semibold text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Best selling plans</h2>
              <p className="mt-1 text-muted-foreground">A home should be as functional as it is beautiful</p>
            </div>
            <Link to="/shop" className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
            Can't find what you're looking for?
          </h2>
          <p className="mt-4 text-primary-foreground/80 text-lg">
            Get a custom house plan designed specifically for your needs
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 font-semibold px-8">
            <Link to="/custom-plan">Design Your Custom Plan</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
