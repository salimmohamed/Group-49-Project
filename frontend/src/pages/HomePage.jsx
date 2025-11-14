import { Link } from 'react-router-dom';
import { Package, Users, ShoppingCart, FileText, UserCircle, Building } from 'lucide-react';

export default function HomePage() {
  const entities = [
    {
      name: 'Customers',
      href: '/customers',
      icon: Users,
      description: 'Manage customer information and contacts'
    },
    {
      name: 'Products',
      href: '/products',
      icon: Package,
      description: 'Browse and manage product catalog'
    },
    {
      name: 'Sales',
      href: '/sales',
      icon: ShoppingCart,
      description: 'View and manage sales orders'
    },
    {
      name: 'Sales Details',
      href: '/salesDetails',
      icon: FileText,
      description: 'Detailed line items for each sale'
    },
    {
      name: 'Sales Associates',
      href: '/salesAssociates',
      icon: UserCircle,
      description: 'Manage sales team members'
    },
    {
      name: 'Manufacturers',
      href: '/manufacturers',
      icon: Building,
      description: 'Manage product manufacturers'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-balance">Tech R Us Sales Management</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Sales Management System for Tech R Us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {entities.map((entity) => {
            const Icon = entity.icon;
            return (
              <Link
                key={entity.name}
                to={entity.href}
                className="group block p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{entity.name}</h2>
                </div>
                <p className="text-muted-foreground text-sm">{entity.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
