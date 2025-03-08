import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, BookOpen } from "lucide-react";

interface Creator {
  name: string;
  tiktokUrl: string;
  schedule: {
    day: string;
    time: string;
    topic: string;
  }[];
}

const creators: Creator[] = [
  {
    name: "Raising Boys",
    tiktokUrl: "https://www.tiktok.com/@raising.boyskbmmg",
    schedule: [
      { day: "Tuesday", time: "10:00 AM - 2:00 PM MST", topic: "Parenting" },
      { day: "Wednesday", time: "9:00 AM - 9:00 PM MST", topic: "Wake the World" },
      { day: "Thursday", time: "10:00 AM - 2:00 PM MST", topic: "Relationships" }
    ]
  }
];

const Schedule = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Live Streaming Schedule</h1>
        <p className="text-muted-foreground mb-8">
          Join our live sessions on TikTok. All times are shown in their local timezone.
        </p>
        
        <div className="space-y-4">
          {creators.map((creator, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{creator.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creator.schedule.map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{slot.day}s at {slot.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground ml-6">
                        <BookOpen className="h-4 w-4" />
                        <span>Topic: {slot.topic}</span>
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline"
                    className="mt-4"
                    onClick={() => window.open(creator.tiktokUrl, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
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
