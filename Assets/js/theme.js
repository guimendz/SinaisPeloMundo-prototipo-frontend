
(function () {
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");

    function applyTheme(theme) {
        if (theme === "dark") {
            htmlElement.setAttribute("data-theme", "dark");
            if (themeToggle) themeToggle.textContent = "light_mode";
        } else {
            htmlElement.removeAttribute("data-theme");
            if (themeToggle) themeToggle.textContent = "dark_mode";
        }
    }

    // Aplica o tema salvo assim que a página carrega
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    // Alterna o tema ao clicar no ícone
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isDark = htmlElement.getAttribute("data-theme") === "dark";
            const newTheme = isDark ? "light" : "dark";
            applyTheme(newTheme);
            localStorage.setItem("theme", newTheme);
        });
    }
})();