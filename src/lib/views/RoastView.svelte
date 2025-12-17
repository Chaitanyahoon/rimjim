<script>
  import { fade, fly } from 'svelte/transition';
  import { rimjimData } from '../data';
  
  let currentRoast = "Click the button if you dare.";
  let isShaking = false;

  function generateRoast() {
    isShaking = true;
    setTimeout(() => isShaking = false, 500);
    
    // Pick random roast
    const roasts = rimjimData.roasts;
    let newRoast = currentRoast;
    while (newRoast === currentRoast) {
      newRoast = roasts[Math.floor(Math.random() * roasts.length)];
    }
    currentRoast = newRoast;
  }
</script>

<div class="view-container" in:fade>
  <div class="card {isShaking ? 'shake' : ''}">
    <h2 class="title">🔥 Roast Generator</h2>
    <div class="roast-box">
      <p class="roast-text">"{currentRoast}"</p>
    </div>
    
    <button class="roast-btn" on:click={generateRoast}>
      🎲 Hit Me
    </button>
  </div>
  
  <div class="lore-section">
    <h3>Canon Lore</h3>
    <div class="lore-grid">
      {#each rimjimData.about.traits as trait, i}
        <div class="lore-item" in:fly="{{ y: 20, delay: 200 + (i * 50) }}">
          <span>{trait.icon}</span>
          <p>{trait.text}</p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .view-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem 15rem 1rem; /* Clear Dock */
    overflow-y: auto;
    width: 100%;
  }

  .card {
    background: var(--bg-card);
    padding: 2rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    text-align: center;
    max-width: 500px;
    width: 100%;
    margin-bottom: 2rem;
    border: 1px solid rgba(196, 181, 253, 0.2);
  }

  .title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }

  .roast-box {
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .roast-text {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--text-primary);
    font-style: italic;
  }

  .roast-btn {
    background: var(--accent-secondary);
    color: #831843;
    padding: 0.8rem 2rem;
    border-radius: 2rem;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(251, 207, 232, 0.5);
    transition: transform 0.1s;
  }

  .roast-btn:active {
    transform: scale(0.95);
  }

  .shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }

  @keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
  }

  .lore-section {
    width: 100%;
    max-width: 600px;
  }

  .lore-section h3 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .lore-grid {
    display: grid;
    gap: 1rem;
  }

  .lore-item {
    background: rgba(255, 255, 255, 0.5);
    padding: 1rem;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.02);
  }
</style>
