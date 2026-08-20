import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ProjectShowcase from '@/components/ProjectShowcase';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';

export default function Home() {
  return (
    <>
      <div className="noise"></div>
      <Preloader />
      <CustomCursor />
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <ProjectShowcase />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}
