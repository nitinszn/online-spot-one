import { Instagram } from "lucide-react";

const PhotoBook = () => {
  const instagramHandle = "renewsantulan";
  const instagramUrl = `https://instagram.com/${instagramHandle}`;

  return (
    <section className="section-padding container-custom bg-secondary/30">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground">
            Follow My Journey
          </h2>
          <a 
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg text-accent hover:text-accent/80 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            @{instagramHandle}
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <a
              key={index}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square rounded-lg bg-muted hover:opacity-80 transition-opacity overflow-hidden group"
            >
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                <Instagram className="w-12 h-12 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Click any image to visit my Instagram
          </p>
        </div>
      </div>
    </section>
  );
};

export default PhotoBook;
