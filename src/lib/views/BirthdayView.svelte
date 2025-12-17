<script>
  import { fade, scale, fly } from "svelte/transition";
  import { rimjimData } from "../data";
  import WholeCake from "../components/WholeCake.svelte";
  import confetti from "canvas-confetti";
  import { onMount } from "svelte";
  import { sfx } from "../sounds";

  let showCard = false;
  let cardOpen = false;
  let isFinale = false;

  function toggleCard() {
    cardOpen = !cardOpen;
    if (cardOpen) {
      fireMiniConfetti();
    }
  }

  function fireMiniConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  function triggerGrandFinale() {
    isFinale = true;
    sfx.playPop(); // Or a bigger sound if available

    // Massive Confetti
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff0000", "#ffa500", "#ffff00"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#00ff00", "#0000ff", "#4b0082"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
</script>

<div class="view-container" in:fade>
  <div class="background-decor-1">🎈</div>
  <div class="background-decor-2">🎉</div>
  <div class="background-decor-3">🎁</div>

  <div class="content">
    {#if !isFinale}
      <h2 class="title" in:scale>{rimjimData.birthday.title}</h2>
      <div class="main-stage">
        <WholeCake />
      </div>
    {:else}
      <div class="neon-sign-wrapper" in:scale={{ duration: 1000 }}>
        <h1 class="neon-text">HAPPY BIRTHDAY</h1>
        <h1 class="neon-text flicker">RIMJHIM</h1>
      </div>
    {/if}

    <div class="controls-section">
      {#if !cardOpen && !isFinale}
        <div class="button-group">
          <button
            class="action-btn card-btn"
            on:click={toggleCard}
            in:fly={{ y: 20 }}
          >
            📩 Open Card
          </button>
          <button
            class="action-btn finale-btn"
            on:click={triggerGrandFinale}
            in:fly={{ y: 20, delay: 200 }}
          >
            🚀 GRAND FINALE
          </button>
        </div>
      {:else if cardOpen}
        <div class="birthday-card" in:scale>
          <button class="close-card" on:click={toggleCard}>×</button>
          <div class="card-inner">
            <h3>To My Favorite Chaos,</h3>
            <p>{rimjimData.birthday.hiddenMessage}</p>
            <div class="signature">- From your permanent headache</div>
          </div>
        </div>
      {:else if isFinale}
        <button
          class="action-btn reset-btn"
          on:click={() => (isFinale = false)}
          in:fade
        >
          BACK TO CAKE 🎂
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .view-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: radial-gradient(
      circle at center,
      #1e1b4b 0%,
      #000000 100%
    ); /* Darker for Neon effect */
    padding-bottom: 14rem;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    width: 100%;
    z-index: 10;
  }

  .content {
    width: 100%;
    max-width: 800px;
    padding: 2rem;
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .title {
    font-size: 3.5rem;
    margin-bottom: 2rem;
    color: #fff;
    text-shadow:
      0 0 10px #e11d48,
      0 0 20px #e11d48;
    font-weight: 900;
  }

  .neon-sign-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .neon-text {
    font-size: 5rem;
    color: #fff;
    text-shadow:
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px #ff00de,
      0 0 30px #ff00de,
      0 0 40px #ff00de,
      0 0 55px #ff00de,
      0 0 75px #ff00de;
    animation: pulse 1.5s infinite alternate;
    font-family: "Monoton", cursive, sans-serif; /* Requires font import or fallback */
    line-height: 1;
  }

  .flicker {
    animation: flicker 2s infinite;
  }

  .main-stage {
    margin-bottom: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .controls-section {
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 500;
  }

  .button-group {
    display: flex;
    gap: 1.5rem;
  }

  .action-btn {
    padding: 1rem 2rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 3rem;
    cursor: pointer;
    font-weight: 800;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .card-btn {
    background: white;
    color: var(--text-primary);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }

  .finale-btn {
    background: linear-gradient(45deg, #ff00de, #00ffff);
    color: white;
    box-shadow: 0 0 20px rgba(255, 0, 222, 0.5);
    animation: wiggle 3s infinite;
  }

  .reset-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid white;
    backdrop-filter: blur(5px);
  }

  .action-btn:hover {
    transform: scale(1.1) translateY(-2px);
    filter: brightness(1.2);
  }

  .birthday-card {
    background: white;
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    position: relative;
    max-width: 450px;
    width: 90%;
    border: 4px solid #fcd34d;
    z-index: 1000;
  }

  .close-card {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.5;
  }

  .card-inner h3 {
    margin-bottom: 1rem;
    color: var(--accent-primary);
  }
  .card-inner p {
    font-size: 1.2rem;
    line-height: 1.6;
    color: var(--text-primary);
  }
  .signature {
    margin-top: 1.5rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-align: right;
  }

  /* Background Decorations */
  .background-decor-1,
  .background-decor-2,
  .background-decor-3 {
    position: absolute;
    font-size: 4rem;
    opacity: 0.2;
    animation: float 6s infinite ease-in-out;
  }
  .background-decor-1 {
    top: 10%;
    left: 10%;
  }
  .background-decor-2 {
    top: 20%;
    right: 10%;
    animation-delay: 2s;
  }
  .background-decor-3 {
    bottom: 20%;
    left: 20%;
    animation-delay: 1s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes flicker {
    0%,
    19%,
    21%,
    23%,
    25%,
    54%,
    56%,
    100% {
      text-shadow:
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 20px #ff00de,
        0 0 30px #ff00de,
        0 0 40px #ff00de,
        0 0 55px #ff00de,
        0 0 75px #ff00de;
    }
    20%,
    24%,
    55% {
      text-shadow: none;
    }
  }

  @keyframes wiggle {
    0%,
    100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-3deg);
    }
    75% {
      transform: rotate(3deg);
    }
  }
</style>
