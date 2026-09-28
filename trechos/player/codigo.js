// ----- Vídeo com botões próprios -----
const videoCustom = document.getElementById("video-custom");

if (videoCustom) {
  const btnPlay = document.getElementById("btn-play");
  const btnMudo = document.getElementById("btn-mudo");
  const videoProgresso = document.getElementById("video-progresso");
  const videoTempo = document.getElementById("video-tempo");

  // 75 segundos viram "1:15"
  function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return min + ":" + String(seg).padStart(2, "0");
  }

  btnPlay.addEventListener("click", function () {
    if (videoCustom.paused) {
      videoCustom.play();
    } else {
      videoCustom.pause();
    }
  });

  videoCustom.addEventListener("play", function () { btnPlay.textContent = "❚❚ Pausar"; });
  videoCustom.addEventListener("pause", function () { btnPlay.textContent = "▶ Tocar"; });

  btnMudo.addEventListener("click", function () {
    videoCustom.muted = !videoCustom.muted;
    btnMudo.textContent = videoCustom.muted ? "Ligar som" : "Tirar som";
  });

  videoCustom.addEventListener("timeupdate", function () {
    if (!videoCustom.duration) return;
    videoProgresso.value = (videoCustom.currentTime / videoCustom.duration) * 100;
    videoTempo.textContent = formatarTempo(videoCustom.currentTime) + " / " + formatarTempo(videoCustom.duration);
  });
}
