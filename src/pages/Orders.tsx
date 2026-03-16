import { useOrders } from "@/hooks/useOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { Package, Clock, CheckCircle2, Truck } from "lucide-react";

export default function Orders() {
  const { data: orders, isLoading } = useOrders();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'preparing': return <Package className="h-4 w-4" />;
      case 'out_for_delivery': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle2 className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'preparing': return 'default';
      case 'out_for_delivery': return 'default';
      case 'delivered': return 'success';
      default: return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      {orders?.length === 0 ? (
        <div className="text-center py-20">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold">No orders yet</h2>
          <p className="text-muted-foreground">Your order history will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-sm font-medium">
                    Order #{order.id.slice(0, 8)}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                  </p>
                </div>
                <Badge variant={getStatusColor(order.status) as any} className="capitalize flex gap-1 items-center">
                  {getStatusIcon(order.status)}
                  {order.status.replace(/_/g, ' ')}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="divide-y">
                    {order.order_items?.map((item) => (
                      <div key={item.id} className="py-2 flex justify-between text-sm">
                        <span>{item.quantity}x {item.pizza?.name}</span>
                        <span>{formatPrice(item.price_at_time * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total</span>
                    <span>{formatPrice(order.total_amount)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p><strong>Delivery to:</strong> {order.delivery_address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
