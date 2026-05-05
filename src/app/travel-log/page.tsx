import { AnimatedSection } from "@/components/ui/animated-section";
import { TravelLogClient } from "@/components/dashboard/travel-log-client";
import { getContinentProgress, getUserTravelStats } from "@/lib/travel-data";

const DEMO_USER_ID = "demo-user";

export default async function TravelLogPage() {
  const [initialStats, initialProgress] = await Promise.all([
    getUserTravelStats(DEMO_USER_ID),
    getContinentProgress(DEMO_USER_ID),
  ]);

  return (
    <div className="container page">
      <AnimatedSection>
        <div className="hero-copy">
          <div>
            <p className="eyebrow">Travel Log</p>
            <h1 className="page-title">Where the miles add up.</h1>
          </div>
          <p className="page-subtitle">Track your continents, country count, and favorite trip rituals in a clean dashboard.</p>
        </div>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <TravelLogClient userId={DEMO_USER_ID} initialStats={initialStats} initialProgress={initialProgress} />
      </AnimatedSection>
    </div>
  );
}
