import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import AboutUs from "@/components/AboutUs";
import FeaturedStudios from "@/components/FeaturedStudios";


export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <FeaturedStudios />
      <AboutUs />
    </main>
  );
}
