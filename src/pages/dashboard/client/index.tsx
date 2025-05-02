
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarDays, 
  UserRound, 
  BedDouble, 
  Bell, 
  CreditCard, 
  Star, 
  Coffee, 
  Wifi, 
  ShieldAlert,
  CheckCircle2,
  Clock,
  ArrowRight 
} from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

const ClientDashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openServiceDialog, setOpenServiceDialog] = useState(false);
  const [maintenanceDialog, setMaintenanceDialog] = useState(false);
  
  // Sample data for multiple room images
  const roomImages = {
    "deluxe": [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470"
    ],
    "executive": [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2500",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1471",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000"
    ]
  };
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handleRoomSelect = (room, images) => {
    setSelectedRoom(room);
    setCurrentImageIndex(0);
  };
  
  const nextImage = (images) => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = (images) => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole="client" />
      
      <div className="flex-1">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Tableau de bord client</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Réservations actives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">2</div>
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Séjours totaux</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">12</div>
                  <BedDouble className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Points de fidélité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">450</div>
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Notifications en attente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">3</div>
                  <Bell className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Séjours à venir</TabsTrigger>
              <TabsTrigger value="history">Historique des réservations</TabsTrigger>
              <TabsTrigger value="services">Services en chambre</TabsTrigger>
              <TabsTrigger value="maintenance">Demandes de maintenance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-4">
              <Card className="hover:shadow-md transition-shadow overflow-hidden">
                <CardHeader>
                  <CardTitle>Chambre Deluxe - #301</CardTitle>
                  <CardDescription>Arrivée: 15 juin 2023 | Départ: 20 juin 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="aspect-video rounded-md overflow-hidden md:col-span-1">
                      <img 
                        src={roomImages.deluxe[0]} 
                        alt="Chambre Deluxe" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <BedDouble className="h-5 w-5 text-primary" />
                          <span>Lit King Size</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">199€</span> / nuit
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          <Wifi className="h-3 w-3 mr-1" />
                          Wi-Fi gratuit
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          <Coffee className="h-3 w-3 mr-1" />
                          Petit-déjeuner inclus
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Vue sur la ville
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <ButtonCustom
                          size="sm"
                          onClick={() => handleRoomSelect("deluxe", roomImages.deluxe)}
                          variant="outline"
                        >
                          Voir les détails
                        </ButtonCustom>
                        <ButtonCustom
                          size="sm"
                          variant="outline"
                          className="border-primary/30 hover:bg-primary/10"
                        >
                          Modifier la réservation
                        </ButtonCustom>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow overflow-hidden">
                <CardHeader>
                  <CardTitle>Suite Executive - #401</CardTitle>
                  <CardDescription>Arrivée: 10 juillet 2023 | Départ: 15 juillet 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="aspect-video rounded-md overflow-hidden md:col-span-1">
                      <img 
                        src={roomImages.executive[0]} 
                        alt="Suite Executive" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <BedDouble className="h-5 w-5 text-primary" />
                          <span>Suite avec vue sur mer</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">299€</span> / nuit
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          <Wifi className="h-3 w-3 mr-1" />
                          Wi-Fi premium
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          <Coffee className="h-3 w-3 mr-1" />
                          Service en chambre
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Salon séparé
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <ButtonCustom
                          size="sm"
                          onClick={() => handleRoomSelect("executive", roomImages.executive)}
                          variant="outline"
                        >
                          Voir les détails
                        </ButtonCustom>
                        <ButtonCustom
                          size="sm"
                          variant="outline"
                          className="border-primary/30 hover:bg-primary/10"
                        >
                          Modifier la réservation
                        </ButtonCustom>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Dialog open={!!selectedRoom} onOpenChange={(open) => !open && setSelectedRoom(null)}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedRoom === "deluxe" ? "Chambre Deluxe - #301" : "Suite Executive - #401"}
                    </DialogTitle>
                    <DialogDescription>
                      {selectedRoom === "deluxe" 
                        ? "Arrivée: 15 juin 2023 | Départ: 20 juin 2023" 
                        : "Arrivée: 10 juillet 2023 | Départ: 15 juillet 2023"}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-4 space-y-6">
                    <div className="relative aspect-video overflow-hidden rounded-md">
                      <img 
                        src={selectedRoom && roomImages[selectedRoom][currentImageIndex]} 
                        alt={`${selectedRoom === "deluxe" ? "Chambre Deluxe" : "Suite Executive"} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {selectedRoom && roomImages[selectedRoom].length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between px-2">
                          <button 
                            onClick={() => prevImage(roomImages[selectedRoom])}
                            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                            aria-label="Image précédente"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 18l-6-6 6-6" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => nextImage(roomImages[selectedRoom])}
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
                        {selectedRoom && roomImages[selectedRoom].map((_, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`}
                            aria-label={`Image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Détails de la réservation</h3>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" /> 
                            {selectedRoom === "deluxe" ? "15 juin - 20 juin, 2023" : "10 juillet - 15 juillet, 2023"}
                          </li>
                          <li className="flex items-center gap-2">
                            <Clock className="h-4 w-4" /> 
                            Check-in: 15h00, Check-out: 11h00
                          </li>
                          <li className="flex items-center gap-2">
                            <UserRound className="h-4 w-4" /> 
                            2 adultes
                          </li>
                          <li className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" /> 
                            {selectedRoom === "deluxe" ? "Total: 995€" : "Total: 1495€"}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Équipements</h3>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <Wifi className="h-4 w-4" /> 
                            {selectedRoom === "deluxe" ? "Wi-Fi gratuit" : "Wi-Fi premium"}
                          </li>
                          <li className="flex items-center gap-2">
                            <Coffee className="h-4 w-4" /> 
                            {selectedRoom === "deluxe" ? "Petit-déjeuner inclus" : "Service en chambre 24h/24"}
                          </li>
                          <li className="flex items-center gap-2">
                            <BedDouble className="h-4 w-4" /> 
                            {selectedRoom === "deluxe" ? "Lit King Size" : "Suite avec salon séparé"}
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" /> 
                            {selectedRoom === "deluxe" ? "Vue sur la ville" : "Vue panoramique sur la mer"}
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t flex justify-end gap-2">
                      <ButtonCustom
                        onClick={() => setOpenServiceDialog(true)}
                        variant="outline"
                      >
                        Demander un service
                      </ButtonCustom>
                      <ButtonCustom>
                        Modifier la réservation
                      </ButtonCustom>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Chambre Premium - #205</CardTitle>
                  <CardDescription>5 mars 2023 - 10 mars 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-green-500" />
                      <span>Paiement complété</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">249€</span> / nuit
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <ButtonCustom variant="outline" size="sm">
                      Voir le reçu
                    </ButtonCustom>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Chambre Standard - #122</CardTitle>
                  <CardDescription>15 février 2023 - 17 février 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-green-500" />
                      <span>Paiement complété</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">179€</span> / nuit
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <ButtonCustom variant="outline" size="sm">
                      Voir le reçu
                    </ButtonCustom>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="services" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Services disponibles</CardTitle>
                  <CardDescription>Services que vous pouvez commander directement dans votre chambre</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setOpenServiceDialog(true)}>
                    <Coffee className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Service en chambre</div>
                      <div className="text-sm text-muted-foreground">Commander de la nourriture et des boissons</div>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </div>
                  <div className="p-4 border rounded-md flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <Wifi className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">WiFi Premium</div>
                      <div className="text-sm text-muted-foreground">Internet haut-débit</div>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Service de réveil</div>
                      <div className="text-sm text-muted-foreground">Programmer un appel de réveil</div>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Service de nettoyage</div>
                      <div className="text-sm text-muted-foreground">Demander un nettoyage supplémentaire</div>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <p className="text-sm text-muted-foreground">
                    Pour des services supplémentaires ou des demandes spéciales, veuillez contacter la réception au poste 100.
                  </p>
                </CardFooter>
              </Card>
              
              <Dialog open={openServiceDialog} onOpenChange={setOpenServiceDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Commander un service en chambre</DialogTitle>
                    <DialogDescription>
                      Choisissez parmi nos options de service en chambre disponibles 24h/24.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 gap-2">
                      {["Petit-déjeuner continental", "Déjeuner léger", "Dîner gastronomique", "Boissons et snacks"].map((item) => (
                        <div key={item} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="font-medium">{item}</div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <ButtonCustom onClick={() => setOpenServiceDialog(false)}>
                      Fermer
                    </ButtonCustom>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>
            
            <TabsContent value="maintenance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Demandes de maintenance</CardTitle>
                  <CardDescription>Signaler des problèmes avec votre chambre ou demander une maintenance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md flex items-start gap-3">
                      <ShieldAlert className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium">Climatisation ne fonctionne pas correctement</div>
                        <div className="text-sm text-muted-foreground mb-2">Soumis: 2 juin 2023 | Statut: En cours</div>
                        <div className="text-sm p-2 bg-muted rounded-md">
                          <span className="font-medium">Mise à jour du technicien:</span> La pièce de rechange a été commandée, sera réparée demain matin.
                        </div>
                      </div>
                    </div>
                    
                    <ButtonCustom className="w-full" onClick={() => setMaintenanceDialog(true)}>
                      Soumettre une nouvelle demande
                    </ButtonCustom>
                  </div>
                </CardContent>
              </Card>
              
              <Dialog open={maintenanceDialog} onOpenChange={setMaintenanceDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Soumettre une demande de maintenance</DialogTitle>
                    <DialogDescription>
                      Décrivez le problème que vous rencontrez dans votre chambre.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="issue-type" className="text-sm font-medium">Type de problème</label>
                      <select id="issue-type" className="w-full p-2 border rounded-md">
                        <option value="">Sélectionner un type</option>
                        <option value="ac">Climatisation</option>
                        <option value="plumbing">Plomberie</option>
                        <option value="electrical">Électrique</option>
                        <option value="furniture">Mobilier</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="description" className="text-sm font-medium">Description</label>
                      <textarea id="description" className="w-full p-2 border rounded-md min-h-[100px]" placeholder="Décrivez le problème en détail..."></textarea>
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="urgency" className="text-sm font-medium">Niveau d'urgence</label>
                      <select id="urgency" className="w-full p-2 border rounded-md">
                        <option value="low">Faible - Peut être réparé plus tard</option>
                        <option value="medium">Moyen - À réparer dans les 24 heures</option>
                        <option value="high">Élevé - Nécessite une attention immédiate</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <ButtonCustom onClick={() => setMaintenanceDialog(false)}>
                      Soumettre la demande
                    </ButtonCustom>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
