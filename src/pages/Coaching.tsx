import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const leadershipCreed = [
  "Your love must be sincere.",
  "Hate what is evil; overcome it by doing good.",
  "Devote yourself to others in love.",
  "Honor others over yourself.",
  "Never be lacking in zeal.",
  "Be joyful in hope.",
  "Be patient in affliction.",
  "Be faithful in prayer.",
  "Practice generosity.",
  "Practice hospitality",
  "Bless those who persecute you.",
  "Rejoice with those who rejoice, mourn with those who mourn.",
  "Live in peace and harmony with others.",
  "Don't be proud.",
  "Don't seek revenge.",
  "Do the next right thing.",
  "Serve your enemy."
];

const Coaching = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Leadership Coaching</h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6 space-y-4">
            <p className="text-lg">
              It is wise to acknowledge the limits to your leadership and lean into all God has for you.
            </p>
            <p className="text-lg">
              God provides what we need.
            </p>
            <p className="text-lg">
              Scripture is alive and fresh every moment. The Holy Spirit translates into our hearts according to the need.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leadership Creed (Roman's 12:9-21)</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 pl-4">
              {leadershipCreed.map((item, index) => (
                <li key={index} className="text-muted-foreground">
                  {item}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Coaching;