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
    <div className="container" style={{ padding: "1.2rem 0 2.4rem" }}>
      <AnimatedSection>
        <h1 style={{ marginBottom: "0.35rem", fontSize: "clamp(1.9rem, 4.4vw, 3rem)" }}>Travel Log</h1>
        <p style={{ color: "var(--text-soft)", marginTop: 0 }}>
          Track your progress with live stats and a clean global coverage snapshot.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <TravelLogClient userId={DEMO_USER_ID} initialStats={initialStats} initialProgress={initialProgress} />
      </AnimatedSection>
    </div>
  );
}
