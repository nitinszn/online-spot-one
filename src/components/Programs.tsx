import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, TrendingUp } from "lucide-react";

const Programs = () => {
  const scrollToBooking = () => {
    document.getElementById('book-session')?.scrollIntoView({ behavior: 'smooth' });
  };

  const programs = [
    {
      icon: Heart,
      title: "Gut Health Restoration",
      description: "Heal digestive issues and restore balance to your microbiome through targeted nutrition protocols."
    },
    {
      icon: TrendingUp,
      title: "Metabolic Optimization",
      description: "Balance hormones, improve energy levels, and optimize your metabolism for sustainable weight management."
    },
    {
      icon: Leaf,
      title: "Holistic Wellness",
      description: "Comprehensive programs addressing stress, sleep, immunity, and overall vitality through functional nutrition."
    }
  ];

  return (
    <section className="section-padding container-custom bg-secondary/30">
      <div className="space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground">
            What is Functional Nutrition?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Functional nutrition is a personalized, science-based approach that looks beyond symptoms to identify and address the root causes of health imbalances. By understanding your unique biochemistry, lifestyle, and health history, we create targeted nutrition strategies that support your body's natural healing processes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card 
              key={index}
              className="p-8 space-y-4 bg-card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <program.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">
                {program.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {program.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={scrollToBooking}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Explore Programs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Programs;
