import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Projects from "../Projects";

// Mock axios
vi.mock("axios");

// Wrapper component to provide router context
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Projects Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders projects page with main sections", async () => {
    // Mock successful API response
    axios.get.mockResolvedValue({
      data: {
        success: true,
        data: [],
      },
    });

    renderWithRouter(<Projects />);

    // Check if main sections are rendered
    await waitFor(() => {
      expect(screen.getByText(/My Projects/i)).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Here are some of my recent projects/i)
    ).toBeInTheDocument();
  });

  it("shows error state when API fails", async () => {
    // Mock failed API response
    axios.get.mockRejectedValue(new Error("Network error"));

    renderWithRouter(<Projects />);

    // Wait for error state
    await waitFor(() => {
      expect(
        screen.getByText(/Failed to load projects from server/i)
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/Showing fallback projects/i)).toBeInTheDocument();
  });

  it("displays project cards with API data when successful", async () => {
    // Mock successful API response with data
    const mockProjects = [
      {
        _id: "1",
        title: "Test Project 1",
        description: "Test description 1",
        technologies: "React, Node.js",
        githubUrl: "https://github.com/test1",
        liveUrl: "https://test1.com",
      },
      {
        _id: "2",
        title: "Test Project 2",
        description: "Test description 2",
        technologies: "Vue, Express",
        githubUrl: "https://github.com/test2",
      },
    ];

    axios.get.mockResolvedValue({
      data: {
        success: true,
        data: mockProjects,
      },
    });

    renderWithRouter(<Projects />);

    // Wait for API projects to load
    await waitFor(() => {
      const projectCards = screen.getAllByTestId("project-card");
      expect(projectCards.length).toBe(2);
    });

    // Check for API project titles
    expect(screen.getByText(/Test Project 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Project 2/i)).toBeInTheDocument();
  });

  it("shows loading state initially", () => {
    // Mock delayed API response
    axios.get.mockImplementation(() => new Promise(() => {}));

    renderWithRouter(<Projects />);

    expect(screen.getByText(/Loading projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Fetching from database/i)).toBeInTheDocument();
  });

  it("renders contact link", async () => {
    // Mock successful API response
    axios.get.mockResolvedValue({
      data: {
        success: true,
        data: [],
      },
    });

    renderWithRouter(<Projects />);

    await waitFor(() => {
      const contactLink = screen.getByTestId("contact-link");
      expect(contactLink).toBeInTheDocument();
      expect(contactLink).toHaveTextContent(/Let's Work Together/i);
    });
  });

  it("displays project technologies as tags", async () => {
    // Mock successful API response with technologies
    const mockProject = {
      _id: "1",
      title: "Test Project",
      description: "Test description",
      technologies: "React, Node.js, MongoDB",
      githubUrl: "https://github.com/test",
    };

    axios.get.mockResolvedValue({
      data: {
        success: true,
        data: [mockProject],
      },
    });

    renderWithRouter(<Projects />);

    await waitFor(() => {
      expect(screen.getByText(/React/i)).toBeInTheDocument();
      expect(screen.getByText(/Node.js/i)).toBeInTheDocument();
      expect(screen.getByText(/MongoDB/i)).toBeInTheDocument();
    });
  });

  it("displays fallback projects when API returns empty data", async () => {
    // Mock successful API response with empty data
    axios.get.mockResolvedValue({
      data: {
        success: true,
        data: [],
      },
    });

    renderWithRouter(<Projects />);

    // Wait for fallback projects to load
    await waitFor(() => {
      const projectCards = screen.getAllByTestId("project-card");
      expect(projectCards.length).toBeGreaterThan(0);
    });

    // Check for fallback project titles
    expect(screen.getByText(/C# Programming Journey/i)).toBeInTheDocument();
    expect(screen.getByText(/Airport Management System/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Linux System Administration/i)
    ).toBeInTheDocument();
  });
});
