import Hero from '@/components/layout/Hero';
import About from '@/components/layout/About';
import WhyChooseUs from '@/components/layout/WhyChooseUs';
import TaxOptionsHeading from '@/components/layout/TaxOptionsHeading';
import TaxComparisonTable from '@/components/layout/TaxComparisonTable';
import Testimonials from '@/components/layout/Testimonials';
import FAQ from '@/components/layout/FAQ';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhyChooseUs />
      <TaxOptionsHeading />
      <TaxComparisonTable />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
