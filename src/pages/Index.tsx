
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, 
  Star, 
  Users, 
  Coffee, 
  Wifi, 
  Tv, 
  Check, 
  Calendar,
  BedDouble,
  CreditCard,
  Wrench,
  Info
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

// Lazy load image helper
const LazyImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={cn(
        "lazy-image",
        loaded ? "lazy-image-loaded" : "lazy-image-loading",
        className
      )}
    />
  );
};

// Feature card component
const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-border animate-slide-up">
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

// Room card component
const RoomCard = ({ 
  image, 
  images, 
  title, 
  price, 
  features,
  description 
}: { 
  image: string; 
  images: string[];
  title: string; 
  price: number; 
  features: string[];
  description: string;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-border h-full flex flex-col animate-slide-up">
      <div className="aspect-video overflow-hidden relative group">
        <LazyImage src={images[currentImageIndex]} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-2 right-2">
          <div className="bg-white dark:bg-gray-800 text-foreground rounded-md px-2 py-1 text-xs font-medium flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            4.9
          </div>
        </div>
        
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={prevImage}
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Image précédente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
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
          {images.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`}
              aria-label={`Image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Grand lit</div>
          <div className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Vue sur mer</div>
        </div>
        <div className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">{price}€</span>
            <span className="text-muted-foreground text-sm"> / nuit</span>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <ButtonCustom size="sm" variant="outline" className="flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  Détails
                </ButtonCustom>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="aspect-video overflow-hidden rounded-md">
                    <LazyImage src={images[currentImageIndex]} alt={title} className="w-full h-full object-cover" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {images.slice(0, 3).map((img, i) => (
                      <div key={i} className="aspect-square rounded-md overflow-hidden">
                        <LazyImage src={img} alt={`${title} - vue ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Caractéristiques:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Link to="/rooms">
                    <ButtonCustom>
                      Réserver maintenant
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </ButtonCustom>
                  </Link>
                </div>
              </DialogContent>
            </Dialog>
            <Link to="/rooms">
              <ButtonCustom size="sm">Réserver</ButtonCustom>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Testimonial component
const Testimonial = ({ text, author, role, avatar }: { text: string; author: string; role: string; avatar: string }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-border animate-slide-up">
    <div className="flex items-center gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
    <p className="text-muted-foreground mb-4">{text}</p>
    <div className="flex items-center gap-3">
      <img src={avatar} alt={author} className="w-10 h-10 rounded-full object-cover" />
      <div>
        <h4 className="font-medium">{author}</h4>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  </div>
);

const Index = () => {
  // Animation on scroll
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample data for rooms with multiple images
  const roomsData = [
    {
      title: "Chambre Deluxe",
      images: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1471",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2500"
      ],
      price: 199,
      description: "Notre chambre Deluxe offre un confort exceptionnel avec un grand lit king-size, une vue imprenable sur la mer et de nombreux équipements premium pour rendre votre séjour inoubliable.",
      features: [
        "Wi-Fi gratuit",
        "Petit-déjeuner inclus",
        "Climatisation",
        "Salle de bain privée"
      ]
    },
    {
      title: "Suite Premium",
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2500",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470"
      ],
      price: 299,
      description: "Notre Suite Premium est l'incarnation du luxe avec un salon séparé, une chambre spacieuse et une terrasse privée. Profitez du service en chambre 24h/24 et d'une vue panoramique.",
      features: [
        "Salon séparé",
        "Service en chambre 24h/24",
        "Minibar gratuit",
        "Jacuzzi privé"
      ]
    },
    {
      title: "Chambre Executive",
      images: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1471",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470"
      ],
      price: 249,
      description: "Notre chambre Executive combine élégance et fonctionnalité avec un espace de travail dédié, un lit confortable et un accès exclusif au salon d'affaires de l'hôtel.",
      features: [
        "Espace de travail dédié",
        "Accès au salon d'affaires",
        "Machine à café Nespresso",
        "Petit-déjeuner continental"
      ]
    }
  ];

  const placeholderAvatar = "https://randomuser.me/api/portraits/men/32.jpg";

  return (
    <>
      <Navbar transparent />
      
      {/* Hero section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute w-96 h-96 bg-primary/5 rounded-full top-1/4 left-1/4 blur-3xl"></div>
          <div className="absolute w-96 h-96 bg-primary/10 rounded-full bottom-1/4 right-1/4 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6 animate-fade-in">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Star className="h-4 w-4 mr-1 fill-primary" />
                <span>Meilleur Système de Gestion Hôtelière</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Bienvenue à <span className="text-primary">Hotel</span>Managerium
              </h1>
              <p className="text-xl text-muted-foreground">
                Découvrez un système de gestion hôtelière fluide et luxueux conçu pour améliorer l'expérience de vos clients.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/auth/register">
                  <ButtonCustom size="lg" className="rounded-md">
                    Commencer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </ButtonCustom>
                </Link>
                <Link to="/auth/login">
                  <ButtonCustom size="lg" variant="outline" className="rounded-md">
                    Se connecter
                  </ButtonCustom>
                </Link>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i * 10}.jpg`}
                      alt="Avatar d'utilisateur"
                      className="w-8 h-8 rounded-full border-2 border-background"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-primary">500+</span> hôtels nous font confiance
                </div>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl transform rotate-3 blur-xl opacity-30"></div>
                <div className="relative bg-white dark:bg-gray-800 p-1 rounded-2xl shadow-lg overflow-hidden border border-border">
                  <LazyImage
                    src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop"
                    alt="Chambre d'hôtel de luxe"
                    className="w-full h-full rounded-xl object-cover aspect-[4/3]"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-border max-w-xs glass">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Gestion intelligente des chambres</h3>
                      <p className="text-xs text-muted-foreground">Gérez efficacement les chambres</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-border max-w-xs glass">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Réservation facile</h3>
                      <p className="text-xs text-muted-foreground">Réservez des chambres en quelques secondes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Solution complète de gestion hôtelière</h2>
            <p className="text-muted-foreground">
              Notre plateforme offre des outils complets pour les clients, les administrateurs et les techniciens afin de rationaliser les opérations hôtelières.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Users}
              title="Gestion des clients"
              description="Gérez les profils des clients, les préférences et l'historique des réservations avec notre interface intuitive."
            />
            <FeatureCard 
              icon={Calendar}
              title="Système de réservation"
              description="Simplifiez le processus de réservation avec notre système de réservation puissant et flexible."
            />
            <FeatureCard 
              icon={BedDouble}
              title="Gestion des chambres"
              description="Gérez efficacement la disponibilité des chambres, la maintenance et les besoins spécifiques."
            />
            <FeatureCard 
              icon={CreditCard}
              title="Facturation et paiements"
              description="Gérez les paiements, les factures et les rapports financiers avec notre système de paiement sécurisé."
            />
            <FeatureCard 
              icon={Wrench}
              title="Suivi de maintenance"
              description="Suivez et gérez les demandes de maintenance, programmez les réparations et surveillez l'état des chambres."
            />
            <FeatureCard 
              icon={Coffee}
              title="Gestion des services"
              description="Gérez les services et les commodités de l'hôtel pour améliorer l'expérience des clients."
            />
          </div>
        </div>
      </section>

      {/* Rooms showcase */}
      <section id="rooms" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Nos Chambres</h2>
              <p className="text-muted-foreground">Découvrez notre sélection de chambres confortables et luxueuses.</p>
            </div>
            <Link to="/rooms">
              <ButtonCustom variant="outline" className="mt-4 md:mt-0">
                Voir toutes les chambres
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonCustom>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomsData.map((room, index) => (
              <RoomCard 
                key={index}
                image={room.images[0]}
                images={room.images}
                title={room.title}
                price={room.price}
                features={room.features}
                description={room.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Ce que disent nos utilisateurs</h2>
            <p className="text-muted-foreground">
              Lisez les témoignages des hôtels et des clients qui ont transformé leurs opérations avec notre plateforme.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Testimonial 
              text="HotelManagerium a complètement transformé la façon dont nous gérons notre hôtel-boutique. L'interface est intuitive et élégante."
              author="Sophie Martin"
              role="Directrice d'hôtel"
              avatar={placeholderAvatar}
            />
            <Testimonial 
              text="En tant que voyageur fréquent, j'adore la facilité avec laquelle je peux réserver des chambres et communiquer avec le personnel de l'hôtel grâce à cette plateforme."
              author="Michel Dupont"
              role="Voyageur d'affaires"
              avatar={placeholderAvatar}
            />
            <Testimonial 
              text="Le système de suivi de maintenance a rendu mon travail de technicien tellement plus efficace. Tout ce dont j'ai besoin est au même endroit."
              author="Thomas Leclerc"
              role="Responsable maintenance"
              avatar={placeholderAvatar}
            />
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prêt à transformer la gestion de votre hôtel ?</h2>
            <p className="text-primary-foreground/80 text-xl mb-8">
              Rejoignez des milliers d'hôtels qui utilisent notre plateforme pour offrir des expériences exceptionnelles à leurs clients.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auth/register">
                <ButtonCustom size="lg" variant="glass" className="rounded-md">
                  Commencer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ButtonCustom>
              </Link>
              <Link to="/contact">
                <ButtonCustom size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-md">
                  Contacter les ventes
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-xl tracking-tight text-foreground mb-4">
                <span className="text-primary">Hotel</span>Managerium
              </div>
              <p className="text-muted-foreground mb-4">
                Une solution complète de gestion hôtelière pour l'industrie hôtelière moderne.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Produit</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Fonctionnalités</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Tarifs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Témoignages</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Entreprise</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary">À propos</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Carrières</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Mentions légales</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Politique de confidentialité</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Conditions d'utilisation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Politique de cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} HotelManagerium. Tous droits réservés.
            </p>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Wifi className="h-4 w-4" />
                <span>Wi-Fi gratuit</span>
                <span className="block h-1 w-1 rounded-full bg-muted-foreground"></span>
                <Tv className="h-4 w-4" />
                <span>Smart TV</span>
                <span className="block h-1 w-1 rounded-full bg-muted-foreground"></span>
                <Coffee className="h-4 w-4" />
                <span>Petit-déjeuner</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
