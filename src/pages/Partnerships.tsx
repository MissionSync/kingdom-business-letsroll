
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Heart } from "lucide-react";

interface Partner {
  name: string;
  description: string;
  website: string;
}

const partners: Partner[] = [
  {
    name: "Youth Haven",
    description: "Youth Haven provides safe shelter, vital support, and life-changing programs for vulnerable and homeless youth in our community. Through compassionate care, educational opportunities, and mental health services, we empower young people to heal from trauma, develop essential life skills, and build pathways to independence. Visit our website to learn more about our mission, volunteer opportunities, and how you can help transform young lives.",
    website: "https://www.youthhaven.org/"
  },
  {
    name: "Veterans Aid Network",
    description: "Veterans Aid Network is dedicated to supporting those who have served our country with honor and courage. Our organization provides essential resources, guidance, and advocacy for veterans navigating the complexities of civilian life. Through personalized assistance with benefits claims, healthcare access, housing solutions, and employment opportunities, we're committed to ensuring no veteran faces their challenges alone. Our network of experienced volunteers and professionals works tirelessly to bridge the gaps in veteran services, creating a seamless support system for heroes in need. Join us in our mission to honor their service by providing the support they deserve.",
    website: "https://veteransaidnetwork.net/"
  },
  {
    name: "The Danielle Lopez Fight Hard Love Harder Foundation",
    description: "The Danielle Lopez Fight Hard Love Harder Foundation is dedicated to empowering individuals facing life's toughest challenges through compassion, resilience, and community support. Founded by Danielle Lopez, our organization embodies the philosophy that while life's battles may be difficult, the power of love and connection is always stronger. Our mission is to provide resources, education, and support programs that help people navigate personal struggles while fostering meaningful connections within their communities. We believe that by fighting hard against adversity and loving even harder, individuals can overcome obstacles and create positive change in their lives and the lives of others.",
    website: "https://www.daniellelopezfighthardloveharderfoundation.com/"
  }
];

const Partnerships = () => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-6 text-center">
            Our Partnerships
          </h1>
          <p className="text-xl text-muted-foreground mb-12 text-center">
            Organizations we support and work alongside to make a difference in our community.
          </p>

          <div className="space-y-8">
            {partners.map((partner, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-primary" />
                    {partner.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-6">
                    {partner.description}
                  </CardDescription>
                  <Button variant="outline" 
                    onClick={() => window.open(partner.website, "_blank")}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Website
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnerships;
