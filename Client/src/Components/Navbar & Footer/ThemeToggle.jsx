import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true); 

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "abyss";
    setIsDark(savedTheme === "abyss");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = isDark ? "fantasy" : "abyss";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        onChange={handleThemeToggle}
        checked={isDark}
      />

      {/* Sun icon (Light mode) */}
      <svg
        className="swap-off max-md:h-6 max-md:ml-11 h-8 w-9 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41..." />
      </svg>

      {/* Moon icon (Dark mode) */}
      <svg
        className="swap-on max-md:h-6 max-md:ml-11 h-8 w-9 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64,13a1,1,0,0,0-1.05-.14..." />
      </svg>
    </label>
  );
};

export default ThemeToggle;
