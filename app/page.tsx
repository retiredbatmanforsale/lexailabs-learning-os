import Navigation from '@/components/landing/Navigation';
import Hero from '@/components/landing/Hero';
import FeaturedCourses from '@/components/landing/FeaturedCourses';
import WhyLexAI from '@/components/landing/WhyLexAI';
import Testimonials from '@/components/landing/Testimonials';
import TeamSection from '@/components/landing/TeamSection';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Hero />
        <FeaturedCourses />
        <WhyLexAI />
        <Testimonials />
        <TeamSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
