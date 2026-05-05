import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TravelLogClient } from "@/components/dashboard/travel-log-client";

describe("TravelLogClient", () => {
  it("renders stats and updates continent checkbox", async () => {
    const user = userEvent.setup();
    render(
      <TravelLogClient
        userId="demo-user"
        initialStats={{ trips: 2, countries: 2, continents: 1, wineBottles: 3 }}
        initialProgress={[
          { continent: "Asia", visited: true },
          { continent: "Europe", visited: false },
        ]}
      />,
    );

    expect(screen.getByText("Trips Logged")).toBeInTheDocument();
    const checkbox = screen.getByLabelText("Europe");
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
