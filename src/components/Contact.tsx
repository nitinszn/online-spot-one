import { Mail, Instagram, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

const Contact = () => {
  return (
    <section className="section-padding container-custom bg-secondary/30">
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions? I'd love to hear from you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 text-center space-y-4 bg-card">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">Email</h3>
              <a 
                href="mailto:contact@nikitasinghal.com"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                contact@nikitasinghal.com
              </a>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-4 bg-card">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Instagram className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">Instagram</h3>
              <a 
                href="https://instagram.com/renewsantulan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                @renewsantulan
              </a>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-4 bg-card">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">Location</h3>
              <p className="text-muted-foreground">
                Online Consultations<br />Worldwide
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
