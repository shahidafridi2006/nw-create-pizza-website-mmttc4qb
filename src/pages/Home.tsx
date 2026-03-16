import { usePizzas } from "@/hooks/usePizzas";
import PizzaCard from "@/components/PizzaCard";
import { Button } from "@/components/ui/button";
import { PizzaIcon, Clock, Truck, Award } from "lucide-react";

export default function Home() {
  const { data: pizzas, isLoading } = usePizzas();

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden hero-gradient">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            The Best <span className="text-primary">Pizza</span> <br />
            In Your Town
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the authentic taste of wood-fired pizza made with fresh, 
            locally sourced ingredients and delivered hot to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
              Order Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Menu
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/30">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-muted-foreground">Hot and fresh pizza delivered to your door in under 30 minutes.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/30">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Ingredients</h3>
            <p className="text-muted-foreground">We use only the finest organic flour and locally sourced toppings.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/30">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
            <p className="text-muted-foreground">Enjoy free delivery on all orders over $30 within the city limits.</p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="container mx-auto px-4 scroll-mt-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Our Menu</h2>
            <p className="text-muted-foreground">Choose from our selection of handcrafted pizzas.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="ghost" size="sm">Classic</Button>
            <Button variant="ghost" size="sm">Specialty</Button>
            <Button variant="ghost" size="sm">Vegetarian</Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[400px] rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pizzas?.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
