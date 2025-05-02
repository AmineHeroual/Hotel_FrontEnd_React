
import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Separator } from "@/components/ui/separator";
import { StarIcon, ArrowRight, Users, Coffee, Wifi, Bath, Tv, CheckCircle2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

const RoomsPage = () => {
  // Sample room data
  const rooms = [
    {
      id: 1,
      name: "Chambre Deluxe",
      description: "Chambre spacieuse avec un lit king-size et vue sur la ville",
      price: 150,
      capacity: "2 Adultes",
      amenities: ["Wi-Fi Gratuit", "Climatisation", "Télévision à écran plat", "Mini Bar"],
      images: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470"
      ],
      rating: 4.8,
      detailedDescription: "Notre chambre Deluxe offre un confort exceptionnel avec un lit king-size, une vue imprenable sur la ville et de nombreux équipements premium. Profitez d'un espace de travail dédié, d'un système de divertissement moderne et d'une salle de bain luxueuse avec douche à effet pluie."
    },
    {
      id: 2,
      name: "Suite Executive",
      description: "Suite de luxe avec espace salon séparé et vues panoramiques",
      price: 280,
      capacity: "2 Adultes, 2 Enfants",
      amenities: ["Wi-Fi Gratuit", "Jacuzzi", "Télévision à écran plat", "Mini Bar", "Espace salon"],
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2500",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1471"
      ],
      rating: 4.9,
      detailedDescription: "Notre Suite Executive est l'incarnation du luxe avec un salon séparé, une chambre spacieuse et une terrasse privée. La suite est équipée d'une salle de bain en marbre avec baignoire et douche séparées, d'un minibar premium et offre un service en chambre 24h/24."
    },
    {
      id: 3,
      name: "Chambre Familiale",
      description: "Parfait pour les familles avec chambres communicantes et espace jeux",
      price: 220,
      capacity: "4 Adultes",
      amenities: ["Wi-Fi Gratuit", "Climatisation", "Télévision à écran plat", "Espace jeux pour enfants"],
      images: [
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1471",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470"
      ],
      rating: 4.6,
      detailedDescription: "Notre Chambre Familiale est spécialement conçue pour les familles en voyage. Elle comprend deux chambres communicantes, un espace jeux pour enfants et de nombreux équipements adaptés aux besoins des familles. Profitez également d'un service de garde d'enfants sur demande."
    },
    {
      id: 4,
      name: "Chambre Standard",
      description: "Chambre confortable avec tous les équipements essentiels",
      price: 120,
      capacity: "2 Adultes",
      amenities: ["Wi-Fi Gratuit", "Climatisation", "Télévision à écran plat"],
      images: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574"
      ],
      rating: 4.5,
      detailedDescription: "Notre Chambre Standard offre un excellent rapport qualité-prix avec tous les équipements essentiels pour un séjour confortable. Elle dispose d'un lit confortable, d'une salle de bain privée et d'un espace de travail compact, parfait pour les voyageurs d'affaires ou les touristes."
    },
  ];

  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes("Wi-Fi")) return <Wifi className="h-4 w-4" />;
    if (amenity.includes("TV") || amenity.includes("Télévision")) return <Tv className="h-4 w-4" />;
    if (amenity.includes("Bar")) return <Coffee className="h-4 w-4" />;
    if (amenity.includes("Jacuzzi")) return <Bath className="h-4 w-4" />;
    return <CheckCircle2 className="h-4 w-4" />;
  };

  const [selectedRoomIndex, setSelectedRoomIndex] = React.useState(0);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = (images: string[]) => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = (images: string[]) => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-luxury-dark text-foreground">
      <Navbar />
      
      {/* Hero section */}
      <div className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <p className="text-luxury-gold uppercase tracking-widest font-light mb-2">Découvrez le Luxe</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Nos Chambres & Suites Exquises</h1>
          <div className="h-0.5 w-20 bg-luxury-gold my-4"></div>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl">
            Découvrez le mélange parfait de confort et d'élégance pour votre séjour
          </p>
        </div>
      </div>
      
      {/* Room list section */}
      <div className="container mx-auto py-16 px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Trouvez Votre Hébergement Parfait</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Parcourez notre sélection de chambres et suites méticuleusement conçues, chacune offrant un confort et un luxe inégalés
          </p>
          <div className="luxury-divider max-w-md mx-auto my-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {rooms.map((room, index) => (
            <Card key={room.id} className="bg-card overflow-hidden transition-all duration-300 border-luxury-gold/20 hover:border-luxury-gold/40 hover:shadow-lg">
              <div className="aspect-video w-full overflow-hidden relative group">
                <img 
                  src={room.images[0]} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
                <div className="absolute bottom-0 w-full flex justify-center gap-1 pb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {room.images.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 rounded-full transition-all ${idx === 0 ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`}
                    />
                  ))}
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="font-serif">{room.name}</CardTitle>
                  <div className="flex items-center gap-1 text-luxury-gold">
                    <StarIcon className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{room.rating}</span>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground">{room.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-luxury-gold" />
                      <span>Capacité</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{room.capacity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Équipements</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, i) => (
                        <span 
                          key={i} 
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20"
                        >
                          {getAmenityIcon(amenity)}
                          <span className="ml-1">{amenity}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t border-luxury-gold/20 pt-4">
                <div>
                  <span className="text-2xl font-bold text-luxury-gold">{room.price}€</span>
                  <span className="text-muted-foreground text-sm"> / nuit</span>
                </div>
                <Dialog onOpenChange={() => {
                  setSelectedRoomIndex(index);
                  setCurrentImageIndex(0);
                }}>
                  <DialogTrigger asChild>
                    <ButtonCustom className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90 group">
                      <span>Réserver</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </ButtonCustom>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-serif">{room.name}</DialogTitle>
                      <DialogDescription>{room.description}</DialogDescription>
                    </DialogHeader>
                    
                    <div className="mt-4 space-y-6">
                      <div className="relative aspect-video overflow-hidden rounded-md">
                        <img 
                          src={room.images[currentImageIndex]} 
                          alt={`${room.name} - Image ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {room.images.length > 1 && (
                          <div className="absolute inset-0 flex items-center justify-between px-2">
                            <button 
                              onClick={() => prevImage(room.images)}
                              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                              aria-label="Image précédente"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => nextImage(room.images)}
                              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                              aria-label="Image suivante"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            </button>
                          </div>
                        )}
                        <div className="absolute bottom-0 w-full flex justify-center gap-1 pb-2">
                          {room.images.map((_, idx) => (
                            <button 
                              key={idx} 
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`}
                              aria-label={`Image ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Description détaillée</h3>
                        <p className="text-muted-foreground text-sm">{room.detailedDescription}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium mb-2">Équipements</h3>
                          <ul className="space-y-1">
                            {room.amenities.map((amenity, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                {getAmenityIcon(amenity)}
                                <span>{amenity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Détails</h3>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p className="flex items-center gap-2">
                              <Users className="h-4 w-4" /> Capacité: {room.capacity}
                            </p>
                            <p>Check-in: 15h00</p>
                            <p>Check-out: 11h00</p>
                            <p className="flex items-center gap-1">
                              Note: <StarIcon className="h-3 w-3 fill-yellow-400" /> {room.rating}/5
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-luxury-gold/20 flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-luxury-gold">{room.price}€</span>
                          <span className="text-muted-foreground text-sm"> / nuit</span>
                        </div>
                        <ButtonCustom className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90">
                          Réserver maintenant
                        </ButtonCustom>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Additional info section */}
      <div className="bg-luxury-dark py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-lg border border-luxury-gold/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-bold mb-4">Forfaits Spéciaux</h3>
              <p className="text-muted-foreground">
                Améliorez votre séjour avec nos forfaits chambre soigneusement élaborés, conçus pour offrir une valeur exceptionnelle et des expériences inoubliables.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-luxury-gold/20 rounded-lg hover:border-luxury-gold/40 transition-all duration-300">
                <h4 className="font-serif text-xl mb-2 text-luxury-gold">Escapade Romantique</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprend un hébergement de luxe, champagne à l'arrivée, traitement spa en couple et dîner romantique pour deux.
                </p>
                <ButtonCustom variant="outline" size="sm" className="border-luxury-gold/50 hover:bg-luxury-gold/10 hover:border-luxury-gold/80 w-full">
                  En savoir plus
                </ButtonCustom>
              </div>
              
              <div className="p-6 border border-luxury-gold/20 rounded-lg hover:border-luxury-gold/40 transition-all duration-300">
                <h4 className="font-serif text-xl mb-2 text-luxury-gold">Excellence Professionnelle</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprend une chambre exécutive, l'accès au salon d'affaires, petit-déjeuner quotidien, service de blanchisserie et transferts aéroport.
                </p>
                <ButtonCustom variant="outline" size="sm" className="border-luxury-gold/50 hover:bg-luxury-gold/10 hover:border-luxury-gold/80 w-full">
                  En savoir plus
                </ButtonCustom>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
