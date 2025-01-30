import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Kingdom Business</h1>
      
      {/* Mission Statement Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Mission Statement</h2>
          <p className="text-lg mb-6">
            Kingdom business activity demonstrates genuine love through actively opposing evil, embracing good, 
            and living in harmony with others, even towards enemies, by actively seeking to overcome evil with good 
            acts of kindness and forgiveness, reflecting the character of Christ in daily life.
          </p>
          <p className="text-lg mb-4">
            The core principle is to express authentic and sincere love in all interactions. We actively reject evil 
            actions and actively pursue good deeds. We respond to negativity with positive actions, even towards 
            those who oppose us. We strive to live peacefully and in agreement with others and to extend grace and 
            forgiveness to those who have wronged us.
          </p>
          <p className="text-sm text-muted-foreground">Roman's 12:9-17</p>
        </CardContent>
      </Card>

      {/* Love in Action Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Love in Action</h2>
          <p className="text-lg mb-6">
            Love must be sincere. Hate what is evil; cling to what is good. Be devoted to one another in love. Honor 
            one another above yourselves. Never be lacking in zeal, but keep your spiritual fervor, serving the 
            Lord. Be joyful in hope, patient in affliction, and faithful in prayer. Share with the Lord's people who are in 
            need. Practice hospitality. Bless those who persecute you; bless and do not curse. Rejoice with those 
            who rejoice; mourn with those who mourn. Live in harmony with one another. Do not be proud, but be 
            willing to associate with people of low position. Do not be conceited. Do not repay anyone evil for evil. Be 
            careful to do what is right in the eyes of everyone.
          </p>
        </CardContent>
      </Card>

      {/* Feed My Sheep Section */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Feed My Sheep</h2>
          <p className="text-lg mb-4">
            We want to have the life Jesus gives. We feed on his words as they are spirit and life.
          </p>
          <p className="text-lg">
            So, when we come to John 21 and we hear him say, "Feed my sheep," we understand he means, "Feed 
            them with my word. I am the life giving nutrition that they will receive through the fullness of you feeding 
            them with my word."
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;