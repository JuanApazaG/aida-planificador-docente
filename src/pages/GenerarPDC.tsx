import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PATUpload } from "@/components/PATUpload";

const GenerarPDC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <PATUpload />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GenerarPDC;