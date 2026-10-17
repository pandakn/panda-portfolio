export const THEME_STORAGE_KEY = "portfolio-theme";

export const themeInitScript = `(() => {
  let saved;
  try { saved = localStorage.getItem("${THEME_STORAGE_KEY}"); } catch {}
  const dark = saved === "dark" || (saved !== "light" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
})();`;
