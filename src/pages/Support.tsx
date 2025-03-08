
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-6 text-center">
            Support Our Mission
          </h1>
          <p className="text-xl text-muted-foreground mb-12 text-center">
            Your financial support helps us continue to wake the sleepers and equip them for the harvest.
          </p>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <div className="mb-4 flex justify-center">
                  <DollarSign className="w-12 h-12 text-green-600" />
                </div>
                <CardTitle>Cash App</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-6">
                  Support us via Cash App using the ID below:
                </CardDescription>
                <p className="text-xl font-semibold mb-6">$raisingboys1776</p>
                <Button className="bg-green-600 hover:bg-green-700 text-white" 
                  onClick={() => window.open("https://cash.app/$raisingboys1776", "_blank")}>
                  Open Cash App
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <div className="mb-4 flex justify-center">
                  <Heart className="w-12 h-12 text-blue-500" />
                </div>
                <CardTitle>Venmo</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-6">
                  Support us via Venmo using the username below:
                </CardDescription>
                <p className="text-xl font-semibold mb-6">@Charles-Lucero-10</p>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => window.open("https://venmo.com/Charles-Lucero-10", "_blank")}>
                  Open Venmo
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-8">
              Thank you for your generous support. Your contribution makes a difference in our community.
            </p>
            <Button variant="outline" asChild>
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
