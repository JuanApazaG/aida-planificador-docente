import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Qué es un PDC?",
      answer: "El Plan de Desarrollo Curricular (PDC) es un documento que los docentes deben presentar mensualmente, detallando los contenidos, actividades y evaluaciones que se desarrollarán en el aula."
    },
    {
      question: "¿Cómo funciona Aida?",
      answer: "Subes tu PAT (Plan Anual de Trabajo) una vez, seleccionas los contenidos que quieres incluir en el mes, y Aida genera automáticamente tu PDC con formato profesional."
    },
    {
      question: "¿Es compatible con el sistema educativo boliviano?",
      answer: "Sí, Aida está diseñada específicamente para cumplir con los estándares y formatos requeridos por el sistema educativo boliviano."
    },
    {
      question: "¿Puedo personalizar el PDC generado?",
      answer: "Absolutamente. Puedes editar, agregar o modificar cualquier sección del PDC antes de descargarlo."
    }
  ];

  return (
    <section id="ejemplos" className="py-20 bg-gradient-to-br from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Preguntas frecuentes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Resolvemos las dudas más comunes sobre Aida y el proceso de generación de PDC.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card-aida">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;