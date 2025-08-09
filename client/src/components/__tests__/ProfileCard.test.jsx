import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProfileCard from "../ProfileCard";

describe("ProfileCard", () => {
  it("renders profile information correctly", () => {
    render(<ProfileCard />);

    // Check if main profile elements are rendered (using default props)
    expect(screen.getByText(/Javi A. Torres/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/javicodes/i)).toBeInTheDocument();
  });

  it("displays contact information", () => {
    render(<ProfileCard />);

    // Check if contact elements are present
    expect(screen.getByText(/Contact Me/i)).toBeInTheDocument();
    expect(screen.getByText(/Online/i)).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    render(
      <ProfileCard
        name="Milyon Kifleyesus"
        title="Full Stack Developer"
        handle="milyon"
        contactText="Get In Touch"
      />
    );

    expect(screen.getByText(/Milyon Kifleyesus/i)).toBeInTheDocument();
    expect(screen.getByText(/Full Stack Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/@milyon/i)).toBeInTheDocument();
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
  });

  it("renders avatar image", () => {
    render(<ProfileCard />);

    const avatars = screen.getAllByAltText(/Javi A. Torres/i);
    expect(avatars.length).toBeGreaterThan(0);
    expect(avatars[0].tagName).toBe("IMG");
  });
});
