import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";

// Wrapper component to provide router context
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Home Page", () => {
  it("renders home page with main sections", () => {
    renderWithRouter(<Home />);

    // Check if main sections are rendered
    expect(screen.getByText(/Hi, I'm/i)).toBeInTheDocument();
    const softwareDevElements = screen.getAllByText(/Software Developer/i);
    expect(softwareDevElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/What I Do/i)).toBeInTheDocument();
  });

  it("displays hero section content", () => {
    renderWithRouter(<Home />);

    // Check hero section elements
    const milyonElements = screen.getAllByText(/Milyon Kifleyesus/i);
    expect(milyonElements.length).toBeGreaterThan(0);
    const softwareDevElements = screen.getAllByText(/Software Developer/i);
    expect(softwareDevElements.length).toBeGreaterThan(0);
    expect(
      screen.getByText(/passionate software engineering student/i)
    ).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderWithRouter(<Home />);

    // Check navigation links
    const viewWorkLink = screen.getByText(/View My Work/i);
    const getInTouchLink = screen.getByText(/Get In Touch/i);

    expect(viewWorkLink).toBeInTheDocument();
    expect(getInTouchLink).toBeInTheDocument();
  });

  it("renders service sections", () => {
    renderWithRouter(<Home />);

    // Check service sections - use getAllByText since there are multiple instances
    const webDevElements = screen.getAllByText(/Web Development/i);
    expect(webDevElements.length).toBeGreaterThan(0);

    const dbElements = screen.getAllByText(/Database Management/i);
    expect(dbElements.length).toBeGreaterThan(0);
  });
});
