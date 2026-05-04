async function includePartials() {
  const includes = document.querySelectorAll("[data-include]");

  for (const el of includes) {
    const path = el.getAttribute("data-include");

    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Failed to load ${path}`);

      el.innerHTML = await response.text();
    } catch (error) {
      console.error(error);
    }
  }
}

includePartials();
