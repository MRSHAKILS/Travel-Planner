import { AnimatedSection } from "@/components/ui/animated-section";
import { GlobeView } from "@/components/globe/globe-view";
import { getDestinations } from "@/lib/travel-data";

export default async function HomePage() {
  const destinations = await getDestinations();

  return (
    <div className="container" style={{ padding: "1.2rem 0 2.4rem" }}>
      <AnimatedSection>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", marginBottom: "0.4rem" }}>Find Your Next Horizon</h1>
        <p style={{ color: "var(--text-soft)", maxWidth: 700, marginTop: 0 }}>
          Navigate the globe, tap destination beacons, and jump straight into your personal travel dashboard.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <GlobeView destinations={destinations} />
      </AnimatedSection>
    </div>
  );
}
