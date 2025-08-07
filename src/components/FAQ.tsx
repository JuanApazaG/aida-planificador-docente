import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Qué necesito para comenzar?",
      answer: "Solo tu archivo PAT y saber qué temas quieres enseñar este mes."
    },
    {
      question: "¿Aida funciona para primaria y secundaria?",
      answer: "Sí, se adapta según el nivel y curso."
    },
    {
      question: "¿Mi información está segura?",
      answer: "Usamos servidores protegidos. Tus documentos no se comparten."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Preguntas Frecuentes
            </h2>
          </div>
          
          <div className="card-aida">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    ❓ {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;