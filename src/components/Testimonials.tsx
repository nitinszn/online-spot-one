import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya M.",
      text: "Working with Nikita has been life-changing. My digestive issues have completely resolved, and I finally have the energy I've been missing for years.",
      rating: 5
    },
    {
      name: "Rahul K.",
      text: "Nikita's personalized approach helped me understand my body's unique needs. The results have been incredible - better sleep, clearer skin, and sustained energy throughout the day.",
      rating: 5
    },
    {
      name: "Ananya S.",
      text: "I was skeptical at first, but Nikita's functional nutrition approach addressed issues that traditional methods couldn't. I'm grateful for her guidance and expertise.",
      rating: 5
    }
  ];

  return (
    <section className="section-padding container-custom">
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground">
            Client Testimonials
          </h2>
          <p className="text-lg text-muted-foreground">
            Real stories from real people
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-8 space-y-4 bg-card border-border"
            >
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-card-foreground leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <p className="font-semibold text-card-foreground">
                — {testimonial.name}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
