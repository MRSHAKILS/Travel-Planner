import { describe, expect, it } from "vitest";
import { buildContinentChart } from "@/lib/travel-data";

describe("buildContinentChart", () => {
  it("counts visited and remaining continents", () => {
    const result = buildContinentChart([
      { continent: "Asia", visited: true },
      { continent: "Europe", visited: false },
      { continent: "Africa", visited: true },
    ]);

    expect(result).toEqual({ visited: 2, remaining: 1 });
  });
});
