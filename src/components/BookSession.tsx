import { Calendar, Clock, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import BookingCalendar from "./BookingCalendar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const BookSession = () => {
  const [showBooking, setShowBooking] = useState(false);
  
  const sessionTypes = [
    {
      icon: Video,
      title: "Initial Consultation",
      duration: "90 minutes",
      description: "Comprehensive health assessment and personalized nutrition plan"
    },
    {
      icon: Calendar,
      title: "Follow-Up Session",
      duration: "45 minutes",
      description: "Progress review and plan adjustments"
    },
    {
      icon: Clock,
      title: "Quick Check-In",
      duration: "30 minutes",
      description: "Questions and guidance between main sessions"
    }
  ];

  return (
    <section id="book-session" className="section-padding container-custom">
      <div className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground">
            Book a consultation to begin your personalized path to optimal health
          </p>
        </div>

        {!showBooking ? (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {sessionTypes.map((session, index) => (
                <Card 
                  key={index}
                  className="p-6 space-y-4 bg-card text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <session.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground">
                    {session.title}
                  </h3>
                  <p className="text-accent font-medium">{session.duration}</p>
                  <p className="text-muted-foreground text-sm">
                    {session.description}
                  </p>
                </Card>
              ))}
            </div>

            <div className="text-center space-y-4">
              <Button 
                size="lg"
                onClick={() => setShowBooking(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-12"
              >
                Schedule Your Consultation
              </Button>
              <p className="text-sm text-muted-foreground">
                Available Monday-Friday, 9 AM - 5 PM IST
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => setShowBooking(false)}
              className="mb-4"
            >
              ← Back to Session Types
            </Button>
            <BookingCalendar />
          </div>
        )}
      </div>
    </section>
  );
};

export default BookSession;
