<script>
  import { fade, fly, scale } from "svelte/transition";
  import { rimjimData } from "../data";
  import { onMount, onDestroy } from "svelte";
  import { sfx } from "../sounds";

  // Data
  const moods = rimjimData.vibe?.moods || [];

  // State
  let currentMood = null;
  let isPlaying = false;
  let currentTrackIndex = 0;
  let showPlayer = false; // Transition state

  // Audio Simulation & Visualizer
  let animationId;
  let canvasRef;

  function selectMood(mood) {
    sfx.playClick();
    currentMood = mood;
    currentTrackIndex = 0;
    showPlayer = true;
    setTimeout(() => {
      isPlaying = true;
      initAudio(); // Simulating audio start
    }, 800); // Wait for transition
  }

  function backToDashboard() {
    isPlaying = false;
    showPlayer = false;
    setTimeout(() => {
      currentMood = null;
    }, 500);
    stopAudio();
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) sfx.playPop();
  }

  function nextTrack() {
    if (!currentMood) return;
    sfx.playClick();
    // Spin down effect simulation
    isPlaying = false;
    setTimeout(() => {
      currentTrackIndex = (currentTrackIndex + 1) % currentMood.playlist.length;
      isPlaying = true;
    }, 300);
  }

  function prevTrack() {
    if (!currentMood) return;
    sfx.playClick();
    isPlaying = false;
    setTimeout(() => {
      currentTrackIndex =
        (currentTrackIndex - 1 + currentMood.playlist.length) %
        currentMood.playlist.length;
      isPlaying = true;
    }, 300);
  }

  // --- Visualizer Logic (Simulated) ---
  function initAudio() {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext("2d");

    function renderFrame() {
      animationId = requestAnimationFrame(renderFrame);
      ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);

      const width = canvasRef.width;
      const height = canvasRef.height;
      const barWidth = 4;
      const gap = 2;
      const barCount = width / (barWidth + gap);

      // Draw bars
      for (let i = 0; i < barCount; i++) {
        // Pseudo-random height based on "isPlaying"
        let barHeight = isPlaying
          ? Math.random() * (height * 0.8) + height * 0.1
          : 4;

        // Mirror effect logic for aesthetic
        const x = i * (barWidth + gap);
        const y = (height - barHeight) / 2;

        ctx.fillStyle = currentMood ? currentMood.color : "#fff";
        ctx.globalAlpha = 0.6;
        ctx.fillRect(x, y, barWidth, barHeight);
      }
    }
    renderFrame();
  }

  function stopAudio() {
    if (animationId) cancelAnimationFrame(animationId);
  }

  onDestroy(() => {
    stopAudio();
  });
</script>

<div class="vibe-container" in:fade>
  <!-- BACKGROUND -->
  <div
    class="ambient-bg"
    style="--mood-color: {currentMood ? currentMood.color : '#1e1b4b'}"
  ></div>

  <!-- HEADER -->
  <header class="vibe-header">
    <h1 class="logo">VINYL<span class="highlight">VIBES</span></h1>
    {#if !showPlayer}
      <p class="subtitle" in:fade>Select a record to set the mood.</p>
    {/if}
  </header>

  <!-- CONTENT -->
  <div class="content-area">
    {#if !showPlayer}
      <!-- DASHBOARD: RECORD SHELF -->
      <div class="shelf-grid" in:fly={{ y: 50, duration: 600 }}>
        {#each moods as mood}
          <button class="record-card" on:click={() => selectMood(mood)}>
            <div class="sleeve" style="background: {mood.color}">
              <span class="mood-icon">{mood.icon}</span>
              <div class="sleeve-texture"></div>
            </div>
            <div class="record-peek"></div>
            <div class="label">
              <span class="mood-name">{mood.name}</span>
            </div>
          </button>
        {/each}
      </div>
    {:else}
      <!-- PLAYER VIEW -->
      <div class="player-wrapper" in:scale={{ duration: 500, start: 0.9 }}>
        <!-- Back Button -->
        <button class="back-btn" on:click={backToDashboard}> ← Eject </button>

        <!-- Turntable (The Star) -->
        <div class="turntable-unit">
          <div class="plinth">
            <!-- Platter -->
            <div class="platter-ring"></div>
            <div class="platter {isPlaying ? 'spinning' : ''}">
              <!-- The Vinyl Record -->
              <div class="vinyl-disc">
                <div class="grooves"></div>
                <div
                  class="record-label"
                  style="background: {currentMood.color}"
                >
                  <span class="spin-icon">{currentMood.icon}</span>
                </div>
              </div>
            </div>

            <!-- Tonearm -->
            <div class="tonearm-assembly {isPlaying ? 'active' : ''}">
              <div class="pivot"></div>
              <div class="arm"></div>
              <div class="headshell"></div>
            </div>

            <!-- Speed Controls (Decor) -->
            <div class="speed-dial"></div>
            <div class="start-stop-btn {isPlaying ? 'on' : ''}"></div>
          </div>
        </div>

        <!-- Track Info & Controls -->
        <div class="track-panel">
          <div class="now-playing">
            <h2 class="track-name">
              {currentMood.playlist[currentTrackIndex].title}
            </h2>
            <p class="artist-name">
              {currentMood.playlist[currentTrackIndex].artist}
            </p>
          </div>

          <div class="playback-controls">
            <button class="ctrl-btn" on:click={prevTrack}>⏮</button>
            <button
              class="ctrl-btn play-pause"
              on:click={togglePlay}
              style="--glow: {currentMood.color}"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button class="ctrl-btn" on:click={nextTrack}>⏭</button>
          </div>

          <!-- Canvas Visualizer -->
          <canvas
            bind:this={canvasRef}
            width="300"
            height="40"
            class="visualizer"
          ></canvas>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    background: #000;
  }

  .vibe-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    font-family: "Outfit", sans-serif;
    color: white;
    display: flex;
    flex-direction: column;
  }

  /* Ambient Background */
  .ambient-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% -20%,
      var(--mood-color),
      #000 70%
    );
    opacity: 0.4;
    transition: background 1s ease;
    z-index: 0;
  }

  .vibe-header {
    position: relative;
    z-index: 10;
    padding: 2rem;
    text-align: center;
  }
  .logo {
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: 4px;
    margin: 0;
  }
  .highlight {
    color: #facc15;
  } /* Gold accent */
  .subtitle {
    color: rgba(255, 255, 255, 0.6);
    margin-top: 0.5rem;
    font-size: 1rem;
  }

  .content-area {
    flex: 1;
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 4rem; /* Space for footer/dock */
  }

  /* --- SHELF GRID --- */
  .shelf-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    max-width: 600px;
  }

  .record-card {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
  }
  .record-card:hover {
    transform: translateY(-10px) scale(1.05);
  }

  .sleeve {
    width: 140px;
    height: 140px;
    border-radius: 4px;
    box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    position: relative;
    z-index: 2;
  }
  .sleeve-texture {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 40%
    );
    pointer-events: none;
  }

  .record-peek {
    position: absolute;
    top: 5px;
    right: -15px; /* Peeking out */
    width: 130px;
    height: 130px;
    background: #111;
    border-radius: 50%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .record-peek::after {
    content: "";
    width: 40px;
    height: 40px;
    background: #333;
    border-radius: 50%;
  }

  .label {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
  }

  /* --- PLAYER UI --- */
  .player-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 100%;
    max-width: 400px;
  }

  .back-btn {
    align-self: flex-start;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.7);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    font-family: inherit;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 1px;
    transition: all 0.2s;
  }
  .back-btn:hover {
    background: white;
    color: black;
  }

  /* Turntable */
  .turntable-unit {
    width: 320px;
    height: 320px;
    background: #27272a; /* Zinc 800 */
    border-radius: 30px;
    box-shadow:
      0 20px 50px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .plinth {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .platter {
    width: 280px;
    height: 280px;
    background: #18181b;
    border-radius: 50%;
    position: absolute;
    top: 20px;
    left: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .vinyl-disc {
    width: 270px;
    height: 270px;
    background: #0f0f0f;
    border-radius: 50%;
    position: relative;
    box-shadow: inset 0 0 0 2px #333;
  }

  .grooves {
    position: absolute;
    inset: 0;
    background: repeating-radial-gradient(
      #111 0,
      #111 2px,
      #1c1c1c 3px,
      #1c1c1c 4px
    );
    border-radius: 50%;
    opacity: 0.8;
  }

  .record-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90px;
    height: 90px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.2);
  }
  /* Spindle hole */
  .record-label::after {
    content: "";
    width: 8px;
    height: 8px;
    background: #e2e8f0;
    border-radius: 50%;
    position: absolute;
  }

  /* Animation Logic */
  .platter.spinning .vinyl-disc {
    animation: spin 1.8s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  /* Tonearm */
  .tonearm-assembly {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 60px;
    height: 240px;
    pointer-events: none;
    transform-origin: 30px 30px; /* Pivot point */
    transform: rotate(0deg);
    transition: transform 1s ease-in-out;
    z-index: 20;
  }
  .tonearm-assembly.active {
    transform: rotate(25deg);
  }

  .pivot {
    width: 50px;
    height: 50px;
    background: #52525b; /* Metal */
    border-radius: 50%;
    position: absolute;
    top: 5px;
    right: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  }
  .arm {
    width: 12px;
    height: 200px;
    background: #71717a; /* Silver arm */
    position: absolute;
    top: 30px;
    right: 24px;
    border-radius: 6px;
  }
  .headshell {
    width: 24px;
    height: 40px;
    background: #3f3f46;
    position: absolute;
    bottom: 10px;
    right: 18px;
    border-radius: 4px;
    transform: rotate(-10deg);
  }

  /* Start/Stop Button on Turntable */
  .start-stop-btn {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 20px;
    height: 20px;
    background: #ef4444;
    border-radius: 2px;
    transition: background 0.2s;
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
  }
  .start-stop-btn.on {
    background: #22c55e;
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
  }

  /* Track Info */
  .track-panel {
    text-align: center;
    width: 100%;
  }
  .track-name {
    font-size: 1.5rem;
    margin: 0;
    font-weight: 700;
  }
  .artist-name {
    color: rgba(255, 255, 255, 0.6);
    margin: 0.2rem 0 1.5rem 0;
    font-size: 1rem;
  }

  .playback-controls {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .ctrl-btn {
    background: transparent;
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.1s;
    opacity: 0.8;
  }
  .ctrl-btn:hover {
    transform: scale(1.1);
    opacity: 1;
  }

  .play-pause {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--glow);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }

  .visualizer {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.05);
  }
</style>
