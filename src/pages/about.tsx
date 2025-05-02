
import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AboutPage = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Alexandra Reynolds",
      role: "General Manager",
      bio: "With over 15 years in luxury hospitality, Alexandra leads our hotel with passion and dedication.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376",
      initials: "AR",
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Executive Chef",
      bio: "Award-winning chef with expertise in international cuisine and a commitment to locally-sourced ingredients.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374",
      initials: "MC",
    },
    {
      id: 3,
      name: "Sophia Patel",
      role: "Guest Relations Director",
      bio: "Dedicated to creating exceptional guest experiences through personalized service and attention to detail.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361",
      initials: "SP",
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Head of Housekeeping",
      bio: "Ensures the highest standards of cleanliness and comfort throughout our hotel facilities.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374",
      initials: "JW",
    },
  ];

  // Company timeline
  const timeline = [
    {
      year: "1992",
      title: "Foundation",
      description: "Hotel Managerium was established with a vision to provide exceptional hospitality experiences.",
    },
    {
      year: "2005",
      title: "Major Renovation",
      description: "Complete redesign and modernization of our facilities to enhance guest comfort.",
    },
    {
      year: "2012",
      title: "Award Recognition",
      description: "Received our first five-star rating and industry recognition for service excellence.",
    },
    {
      year: "2018",
      title: "Expansion",
      description: "Opened new locations in major cities, bringing our unique hospitality approach to more guests.",
    },
    {
      year: "2023",
      title: "Sustainability Initiative",
      description: "Launched comprehensive sustainability program, committing to eco-friendly practices.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero section */}
      <div className="relative h-[40vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1470')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl">
            Our story, mission, and the team behind Hotel Managerium
          </p>
        </div>
      </div>
      
      {/* Our Story section */}
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Founded in 1992, Hotel Managerium began with a simple vision: to create a sanctuary where travelers could experience the perfect blend of luxury, comfort, and authentic hospitality. What started as a boutique hotel with just 25 rooms has grown into a renowned hospitality group with properties across multiple locations, without ever losing sight of our core values.
            </p>
            <p>
              Our journey has been defined by a relentless pursuit of excellence, a deep respect for diverse cultures, and an unwavering commitment to personalized service. We believe that true luxury lies not just in physical amenities, but in creating memorable experiences that resonate with our guests long after they've checked out.
            </p>
            <p>
              Throughout our history, we've embraced innovation while honoring traditions, adapted to changing travel trends while maintaining timeless service standards, and expanded our reach while preserving the intimate atmosphere that made us special from the beginning.
            </p>
          </div>
        </div>
      </div>
      
      {/* Mission & Values section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Mission & Values</h2>
            <p className="text-lg mb-8">
              We exist to provide exceptional hospitality experiences that exceed expectations, 
              create lasting memories, and make every guest feel valued and understood.
            </p>
            <Separator className="max-w-md mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 text-primary p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in every detail, from the comfort of our beds to the warmth of our service.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 text-primary p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
                <p className="text-muted-foreground">
                  We embrace authentic hospitality that reflects genuine care for our guests and their experiences.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 text-primary p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  We are committed to sustainable practices that respect our environment and communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Our Team section */}
      <div className="container mx-auto py-16 px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The passionate professionals dedicated to making your stay exceptional
          </p>
          <Separator className="mt-8 max-w-md mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-primary font-medium mb-2">{member.role}</p>
              <p className="text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Company Timeline */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in the evolution of Hotel Managerium
            </p>
            <Separator className="mt-8 max-w-md mx-auto" />
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1">
                    <div className={`${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="inline-block bg-primary text-white px-3 py-1 text-sm font-medium rounded mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
