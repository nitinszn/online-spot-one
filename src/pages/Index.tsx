import Hero from "@/components/Hero";
import ScrollExpandMedia from "@/components/ScrollExpandMedia";
import Programs from "@/components/Programs";
import Testimonials from "@/components/Testimonials";
import PhotoBook from "@/components/PhotoBook";
import BookSession from "@/components/BookSession";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import wellnessBg from "@/assets/wellness-background.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/videos/nikita-story.mp4"
        bgImageSrc={wellnessBg}
        title="My Journey"
        scrollToExpand="Scroll to expand"
      />
      <Programs />
      <Testimonials />
      <PhotoBook />
      <BookSession />
      <Contact />
      <FAQ />
      
      <footer className="bg-foreground/5 py-8 px-6">
        <div className="container-custom text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nikita Singhal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
