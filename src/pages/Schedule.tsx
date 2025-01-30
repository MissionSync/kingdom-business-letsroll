import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrandsTiktok, Clock } from "lucide-react";

interface Creator {
  name: string;
  tiktokUrl: string;
  schedule: {
    day: string;
    time: string;
  }[];
}

const creators: Creator[] = [
  {
    name: "Kingdom Business",
    tiktokUrl: "https://www.tiktok.com/@kingdombusinessletsroll",
    schedule: [
      { day: "Monday", time: "7:00 PM EST" },
      { day: "Wednesday", time: "7:00 PM EST" },
      { day: "Friday", time: "7:00 PM EST" }
    ]
  }
  // More creators can be added here
];

const Schedule = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Live Streaming Schedule</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Join our community creators during their live streaming sessions on TikTok. All times are in Eastern Standard Time (EST).
        </p>
        
        <div className="grid gap-6">
          {creators.map((creator, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl">{creator.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    {creator.schedule.map((slot, slotIndex) => (
                      <div key={slotIndex} className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{slot.day}s at {slot.time}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full sm:w-auto mt-4"
                    onClick={() => window.open(creator.tiktokUrl, '_blank')}
                  >
                    <BrandsTiktok className="mr-2 h-4 w-4" />
                    Follow on TikTok
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;