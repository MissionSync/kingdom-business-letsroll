import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, MessageSquare, DollarSign, BookOpen, Handshake, Home, Video } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const services = [
    {
      icon: <Heart className="w-12 h-12 text-primary" />,
      title: "Community Care",
      description: "Building strong relationships through compassion and support"
    },
    {
      icon: <Video className="w-12 h-12 text-primary" />,
      title: "Live Streaming Schedules",
      description: "Connect and grow with live online sessions",
      link: "/schedule"
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-primary" />,
      title: "Coaching",
      description: "Personal guidance for your spiritual journey"
    },
    {
      icon: <BookOpen className="w-12 h-12 text-primary" />,
      title: "Resources",
      description: "Access to valuable learning materials"
    },
    {
      icon: <Handshake className="w-12 h-12 text-primary" />,
      title: "Partnerships",
      description: "Collaborate with community businesses"
    },
    {
      icon: <DollarSign className="w-12 h-12 text-primary" />,
      title: "Support",
      description: "Contribute to our mission through donations"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Welcome to Kingdom Business
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Building community connections and fostering spiritual growth through compassion, guidance, and support.
          </p>
          <Button size="lg" asChild>
            <Link to="/about">About Us</Link>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader className="text-center">
                  <div className="mb-4 flex justify-center">
                    {service.icon}
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {service.description}
                  </CardDescription>
                  {service.link && (
                    <div className="mt-4 text-center">
                      <Button variant="outline" asChild>
                        <Link to={service.link}>View Schedule</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with us and discover how we can grow together in faith & through prayer as we follow his purpose to wake the sleepers.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;