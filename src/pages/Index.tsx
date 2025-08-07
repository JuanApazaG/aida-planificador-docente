import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import ProblemSolution from "@/components/ProblemSolution";
import Differentiators from "@/components/Differentiators";
import Testimonial from "@/components/Testimonial";
import Offer from "@/components/Offer";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ValueProposition />
      <ProblemSolution />
      <Differentiators />
      <Testimonial />
      <Offer />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
