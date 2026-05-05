import { AnimatedSection } from "@/components/ui/animated-section";
import { GlobeView } from "@/components/globe/globe-view";
import { getDestinations } from "@/lib/travel-data";

export default async function HomePage() {
  const destinations = await getDestinations();

  return (
    <div className="container page">
      <AnimatedSection>
        <div className="hero-copy">
          <div>
            <p className="eyebrow">Interactive Globe</p>
            <h1 className="page-title">Find your next horizon.</h1>
          </div>
          <p className="page-subtitle">
            Spin the world, pick a destination, and move straight into a travel log that feels calm, crisp, and alive.
          </p>
        </div>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <GlobeView destinations={destinations} />
      </AnimatedSection>
    </div>
  );
}
