<script>
  import { fade, fly, scale } from "svelte/transition";
  import { rimjimData } from "../data";
  import { sfx } from "../sounds";

  let currentRoast = "Click the button if you dare.";
  let isShaking = false;
  let damageLevel = 0; // 0 to 100
  let roastCount = 0;

  function generateRoast() {
    if (isShaking) return;

    // SFX and Animation
    sfx.playWhoosh();
    isShaking = true;
    setTimeout(() => (isShaking = false), 500);

    // Pick random roast
    const roasts = rimjimData.roasts;
    let newRoast = currentRoast;
    while (newRoast === currentRoast) {
      newRoast = roasts[Math.floor(Math.random() * roasts.length)];
    }
    currentRoast = newRoast;

    // Increase Damage Level
    roastCount++;
    damageLevel = Math.min(
      damageLevel + Math.floor(Math.random() * 20) + 10,
      100,
    );
  }
</script>

<div class="view-container" in:fade>
  <h2 class="section-title">🔥 Roast Roulette</h2>

  <div class="card-container">
    <div class="card {isShaking ? 'shake' : ''}">
      <div class="card-header">
        <span class="icon">💀</span>
        <span class="label">RimjimBot v9000</span>
      </div>

      <div class="roast-content">
        <p class="roast-text">"{currentRoast}"</p>
      </div>

      <div class="meter-container">
        <div class="meter-label">
          <span>Emotional Damage</span>
          <span>{damageLevel}%</span>
        </div>
        <div class="meter-bar-bg">
          <div
            class="meter-bar-fill"
            style="width: {damageLevel}%; background: {damageLevel > 80
              ? 'var(--accent-pink)'
              : damageLevel > 50
                ? 'var(--accent-secondary)'
                : 'var(--accent-green)'}"
          ></div>
        </div>
        <p class="meter-comment">
          {#if damageLevel === 0}
            Ready to cry?
          {:else if damageLevel < 50}
            Stings a little...
          {:else if damageLevel < 90}
            Applying cold water to burn area...
          {:else}
            CRITICAL HIT 🚑
          {/if}
        </p>
      </div>

      <button class="roast-btn" on:click={generateRoast}>
        {roastCount === 0 ? "Hit Me 🎲" : "Another One 😤"}
      </button>
    </div>
  </div>
</div>

<style>
  .view-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem 6rem 1rem;
    overflow-y: auto;
    scrollbar-width: none;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: var(--text-primary);
    font-weight: 800;
    text-align: center;
    background: linear-gradient(to right, #ef4444, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .card-container {
    width: 100%;
    max-width: 500px;
    perspective: 1000px;
  }

  .card {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    padding: 2.5rem 2rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    border: var(--glass-border);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.2s;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    opacity: 0.7;
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 0.9rem;
    text-transform: uppercase;
  }

  .roast-content {
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.5rem;
  }

  .roast-text {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.4;
  }

  .meter-container {
    width: 100%;
    margin-bottom: 2rem;
    background: rgba(255, 255, 255, 0.5);
    padding: 1rem;
    border-radius: var(--radius-md);
  }

  .meter-label {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
    text-transform: uppercase;
  }

  .meter-bar-bg {
    width: 100%;
    height: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .meter-bar-fill {
    height: 100%;
    transition:
      width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
      background 0.5s;
  }

  .meter-comment {
    font-size: 0.9rem;
    font-style: italic;
    color: var(--text-secondary);
    min-height: 1.4em;
  }

  .roast-btn {
    background: var(--text-primary);
    color: var(--bg-card);
    padding: 1rem 3rem;
    border-radius: 3rem;
    font-weight: 700;
    font-size: 1.1rem;
    box-shadow: var(--shadow-soft);
    transition: all 0.2s;
    cursor: pointer;
  }

  .roast-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-float);
    background: black;
  }

  .roast-btn:active {
    transform: scale(0.95);
  }

  .shake {
    animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
