document.addEventListener("DOMContentLoaded", () => {
    const videoPlayer = document.getElementById("videoPlayer");
    const buttons = document.querySelectorAll(".mask-button");
    const playPauseBtn = document.getElementById("playPauseBtn");

    // Función para actualizar visibilidad del botón play/pause según el estado del video
    function updatePlayPauseButton() {
        if (videoPlayer.paused) {
            playPauseBtn.textContent = "▶";
            playPauseBtn.classList.remove("hidden");
        } else {
            playPauseBtn.textContent = "❚❚"; // pausa
            playPauseBtn.classList.add("hidden");
        }
    }

    // Cambiar video al clickear un botón
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const newSrc = button.getAttribute("data-src");
            if (!newSrc) return;

            const source = videoPlayer.querySelector("source");
            source.src = newSrc;
            videoPlayer.load();
            videoPlayer.play();
            updatePlayPauseButton();
        });
    });

    // Click en el botón central para toggle play/pause
    playPauseBtn.addEventListener("click", () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
        updatePlayPauseButton();
    });

    // Click dentro del contenedor de video (video o botón) también toggle play/pause
    document.querySelector(".videoWrapper").addEventListener("click", (e) => {
        // Para evitar conflicto, si clickeaste el botón, no repitas toggle aquí
        if (e.target === playPauseBtn) return;

        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
        updatePlayPauseButton();
    });

    // Actualiza botón cuando el usuario use controles nativos (play/pause)
    videoPlayer.addEventListener("play", updatePlayPauseButton);
    videoPlayer.addEventListener("pause", updatePlayPauseButton);

    // Inicializa estado
    updatePlayPauseButton();
});
