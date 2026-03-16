import { Pizza } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Flame, Leaf } from "lucide-react";

interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden group flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={pizza.image_url} 
          alt={pizza.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {pizza.is_vegetarian && (
            <Badge variant="secondary" className="bg-green-500/90 text-white border-none">
              <Leaf className="h-3 w-3 mr-1" /> Veg
            </Badge>
          )}
          {pizza.is_spicy && (
            <Badge variant="destructive" className="bg-red-500/90 text-white border-none">
              <Flame className="h-3 w-3 mr-1" /> Spicy
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{pizza.name}</h3>
          <span className="font-bold text-primary">{formatPrice(pizza.price)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {pizza.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => addToCart(pizza)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
