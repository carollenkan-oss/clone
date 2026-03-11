import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Package, Users, ShoppingBag, LayoutDashboard, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { samplePlans } from '@/data/samplePlans';
import { toast } from 'sonner';

export default function Admin() {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <Layout><div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div></Layout>;

  if (!isAdmin) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground mt-2">You need admin privileges to access this page.</p>
          <Button asChild className="mt-4"><Link to="/">Go Home</Link></Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your house plans and orders</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Package, label: 'Total Plans', value: samplePlans.length, color: 'text-accent' },
            { icon: ShoppingBag, label: 'Orders', value: 0, color: 'text-primary' },
            { icon: Users, label: 'Customers', value: 0, color: 'text-accent' },
            { icon: LayoutDashboard, label: 'Revenue', value: '$0', color: 'text-primary' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-card border rounded-lg p-5">
              <div className="flex items-center justify-between">
                <Icon className={`h-8 w-8 ${color}`} />
                <span className="text-2xl font-bold">{value}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="plans">
          <TabsList>
            <TabsTrigger value="plans">House Plans</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">All Plans</h2>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" /> Add Plan
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary text-left">
                    <th className="p-3">Image</th>
                    <th className="p-3">Plan ID</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {samplePlans.map((plan) => (
                    <tr key={plan.id} className="border-t hover:bg-secondary/50">
                      <td className="p-3">
                        <div className="w-12 h-12 rounded overflow-hidden bg-muted">
                          <img src={plan.main_image} alt="" className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="p-3 font-medium">ID {plan.plan_id}</td>
                      <td className="p-3">{plan.title}</td>
                      <td className="p-3">{plan.category}</td>
                      <td className="p-3 font-medium">${plan.base_price.toFixed(2)}</td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${plan.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {plan.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingBag className="mx-auto h-12 w-12 mb-3 opacity-30" />
              <p>No orders yet. Orders will appear here once customers start purchasing.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
