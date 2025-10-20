import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is functional nutrition?",
      answer: "Functional nutrition is a personalized, science-based approach that addresses the root causes of health imbalances rather than just treating symptoms. It considers your unique biochemistry, lifestyle, genetics, and health history to create targeted nutrition strategies."
    },
    {
      question: "How long does it take to see results?",
      answer: "Results vary based on individual health concerns and goals. Many clients notice improvements in energy and digestion within 2-4 weeks, while deeper healing of chronic conditions may take 3-6 months. We track progress regularly and adjust protocols as needed."
    },
    {
      question: "Do you provide meal plans?",
      answer: "Yes, all programs include personalized nutrition protocols and meal guidance tailored to your specific needs, preferences, and lifestyle. I focus on practical, sustainable approaches that fit into your daily routine."
    },
    {
      question: "Are sessions covered by insurance?",
      answer: "Currently, sessions are not directly covered by insurance. However, I can provide detailed receipts that you may submit to your insurance provider for potential reimbursement under out-of-network benefits."
    },
    {
      question: "What should I expect in the first consultation?",
      answer: "The initial consultation includes a comprehensive health history review, discussion of current symptoms and goals, lifestyle assessment, and preliminary nutrition recommendations. You'll leave with actionable steps and a clear path forward."
    }
  ];

  return (
    <section className="section-padding container-custom">
      <div className="space-y-12 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left text-card-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="bg-secondary/50 rounded-lg p-8 space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Disclaimer</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The information provided on this website and during consultations is for educational purposes only and is not intended as medical advice. Functional nutrition services are not a substitute for professional medical care. Always consult with your healthcare provider before making any changes to your diet, lifestyle, or treatment plan. Results may vary based on individual circumstances, and no specific outcomes are guaranteed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
