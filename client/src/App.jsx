import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AdminDashboard from "./components/admin/AdminDashboard";
import { useState, useEffect } from "react";

// Create router with future flags for v7 behavior
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "projects", element: <Projects /> },
        { path: "services", element: <Services /> },
        { path: "contact", element: <Contact /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        { path: "admin", element: <AdminDashboard /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
    // Note: The warning about startTransition is expected and indicates
    // that the future flags are working correctly for React Router v7
  }
);

// Layout component that includes the Navbar
function AppLayout() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="App">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
