import { Button } from "@/components/ui/button";
import nikitaProfile from "@/assets/nikita-profile.png";
import SplitText from "./SplitText";
const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById('book-session')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="section-padding container-custom">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
            <img src={nikitaProfile} alt="Nikita Singhal - Functional Nutritionist" className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="space-y-6">
          <SplitText text="Hi I am Nikita" className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground" tag="h1" delay={70} duration={2} ease="elastic.out(1, 0.3)" splitType="chars" from={{
          y: 50,
          scale: 0.8
        }} to={{
          y: 0,
          scale: 1
        }} threshold={0.1} rootMargin="0px" />
          <SplitText text="Functional Nutritionist" className="text-xl md:text-2xl text-muted-foreground" tag="h2" delay={70} duration={2} ease="elastic.out(1, 0.3)" splitType="chars" from={{
          y: 30
        }} to={{
          y: 0
        }} threshold={0.1} rootMargin="0px" />
          
          <Button onClick={scrollToBooking} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground mx-[19px] px-[8px] py-[16px] my-0">
            Book a Consultation
          </Button>
        </div>
      </div>
    </section>;
};
export default Hero;