(function () {
    const htmlElement = document.documentElement;
    const increaseBtn = document.getElementById("textIncrease");
    const decreaseBtn = document.getElementById("textDecrease");

    const MIN_SCALE = 0.8;
    const MAX_SCALE = 1.4;
    const STEP = 0.1;

    function applyScale(scale) {
        const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
        htmlElement.style.setProperty("--font-scale", clamped);
        localStorage.setItem("fontScale", clamped);
    }

    // Aplica a escala salva assim que a página carrega
    const savedScale = parseFloat(localStorage.getItem("fontScale")) || 1;
    applyScale(savedScale);

    if (increaseBtn) {
        increaseBtn.addEventListener("click", () => {
            const current = parseFloat(localStorage.getItem("fontScale")) || 1;
            applyScale(current + STEP);
        });
    }

    if (decreaseBtn) {
        decreaseBtn.addEventListener("click", () => {
            const current = parseFloat(localStorage.getItem("fontScale")) || 1;
            applyScale(current - STEP);
        });
    }
})();