
import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Separator } from "@/components/ui/separator";
import { Check, Utensils, Coffee, Wifi, Dumbbell, Bath, Clock, Star, ArrowRight } from "lucide-react";

const ServicesPage = () => {
  // Sample services
  const services = [
    {
      id: 1,
      name: "Fine Dining",
      description: "Experience culinary excellence with our gourmet restaurant offering local and international cuisine.",
      icon: Utensils,
      highlights: [
        "Award-winning executive chef",
        "Farm-to-table ingredients",
        "Extensive wine collection",
        "Private dining rooms available"
      ],
      price: "$$",
      hours: "6:30 AM - 10:30 PM",
      image: "https://images.unsplash.com/photo-1599458252573-56ae36120de1?q=80&w=2070"
    },
    {
      id: 2,
      name: "Spa & Wellness",
      description: "Relax and rejuvenate with our comprehensive spa treatments and wellness programs.",
      icon: Bath,
      highlights: [
        "Aromatherapy massages",
        "Facial treatments",
        "Hot stone therapy",
        "Couples packages"
      ],
      price: "$$$",
      hours: "9:00 AM - 8:00 PM",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070"
    },
    {
      id: 3,
      name: "Fitness Center",
      description: "Maintain your fitness routine with our state-of-the-art equipment and professional trainers.",
      icon: Dumbbell,
      highlights: [
        "Latest cardio equipment",
        "Free weights area",
        "Yoga and pilates classes",
        "Personal training available"
      ],
      price: "Complimentary for guests",
      hours: "24/7 Access",
      image: "https://images.unsplash.com/photo-1637666231113-34a4564e71a6?q=80&w=2069"
    },
    {
      id: 4,
      name: "Coffee Lounge",
      description: "Enjoy specialty coffees, teas, and light snacks in our comfortable lounge area.",
      icon: Coffee,
      highlights: [
        "Premium coffee selection",
        "Freshly baked pastries",
        "Complimentary newspapers",
        "High-speed WiFi"
      ],
      price: "$",
      hours: "6:00 AM - 10:00 PM",
      image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2071"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-luxury-dark text-foreground">
      <Navbar />
      
      {/* Hero section */}
      <div className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070')" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <p className="text-luxury-gold uppercase tracking-widest font-light mb-2">Premium Experience</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Exclusive Services</h1>
          <div className="h-0.5 w-20 bg-luxury-gold my-4"></div>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl">
            Indulge in our exceptional amenities and services designed for your utmost comfort
          </p>
        </div>
      </div>
      
      {/* Services section */}
      <div className="container mx-auto py-16 px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Our Premium Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a curated selection of world-class services to enhance your stay and create unforgettable memories
          </p>
          <div className="luxury-divider max-w-md mx-auto my-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {services.map((service) => (
            <Card key={service.id} className="bg-card overflow-hidden transition-all duration-300 border-luxury-gold/20 hover:border-luxury-gold/40 hover:shadow-lg">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-serif">{service.name}</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Highlights</p>
                    <ul className="space-y-2">
                      {service.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-luxury-gold" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-luxury-gold/10">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-luxury-gold" />
                      <span className="text-sm text-muted-foreground">{service.hours}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-luxury-gold">{service.price}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t border-luxury-gold/20 pt-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                  ))}
                </div>
                <ButtonCustom className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90 group">
                  <span>Book Now</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ButtonCustom>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Additional services section */}
        <div className="mt-16 glass p-8 rounded-lg border border-luxury-gold/20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-serif font-bold">Complimentary Services</h3>
            <p className="text-muted-foreground mt-2">
              Enjoy these premium amenities included with your stay
            </p>
            <div className="h-0.5 w-16 bg-luxury-gold/50 mx-auto my-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border border-luxury-gold/20 flex flex-col items-center text-center hover:border-luxury-gold/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold mb-4">
                <Wifi className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-lg mb-2">High-Speed WiFi</h4>
              <p className="text-sm text-muted-foreground">
                Stay connected with complimentary high-speed internet access throughout the property
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-luxury-gold/20 flex flex-col items-center text-center hover:border-luxury-gold/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-lg mb-2">24/7 Room Service</h4>
              <p className="text-sm text-muted-foreground">
                Enjoy delicious meals delivered to your room at any time of day or night
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-luxury-gold/20 flex flex-col items-center text-center hover:border-luxury-gold/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold mb-4">
                <Utensils className="h-6 w-6" />
              </div>
              <h4 className="font-serif text-lg mb-2">Breakfast Buffet</h4>
              <p className="text-sm text-muted-foreground">
                Start your day with our extensive breakfast buffet featuring local and international dishes
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <ButtonCustom variant="outline" className="border-luxury-gold/50 hover:bg-luxury-gold/10 hover:border-luxury-gold/80">
              View All Services
            </ButtonCustom>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
