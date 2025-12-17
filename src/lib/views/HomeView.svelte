<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { rimjimData } from '../data';
  import { isChaosMode } from '../store';

  import StickyNote from '../components/StickyNote.svelte';
  import TinyThings from '../components/TinyThings.svelte';
  import { sfx } from '../sounds';

  let visible = false;
  let displayedText = "";
  const fullText = rimjimData.welcome.title;
  
  // Typing effect
  onMount(() => {
    visible = true;
    let i = 0;
    const interval = setInterval(() => {
      displayedText += fullText[i];
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  });

  function toggleChaos() {
    isChaosMode.update(n => !n);
    sfx.playWhoosh();
  }
</script>

<StickyNote />

<div class="view-container {$isChaosMode ? 'chaos' : ''}" in:fade>
  <div class="hero-content">
    <h1 class="title">
      {displayedText}
      <span class="cursor">|</span>
    </h1>
    <p class="subtext" in:fly="{{ y: 20, delay: 2000 }}">
      {rimjimData.welcome.subtext}
    </p>

    <button class="chaos-toggle" on:click={toggleChaos}>
      {#if $isChaosMode}
        🚫 Stop the Chaos
      {:else}
        ⚡ Unleash Chaos
      {/if}
    </button>
  </div>
  
  <div class="scroll-content">
    <TinyThings />
  </div>

  {#if $isChaosMode}
    <div class="chaos-overlay">
      {#each Array(20) as _, i}
        <div 
          class="emoji-rain" 
          style="left: {Math.random() * 100}%; animation-delay: {Math.random() * 2}s; font-size: {Math.random() * 2 + 1}rem"
        >
          {['👽', '👾', '🌈', '🍕', '💩', '🦄'][Math.floor(Math.random() * 6)]}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .view-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow-y: auto;
    padding-bottom: 8rem; /* Dock space */
  }

  .hero-content {
    z-index: 10;
    padding: 4rem 2rem 2rem 2rem;
    text-align: center;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .scroll-content {
    width: 100%;
    z-index: 10;
  }

  .title {
    font-size: 4rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.05em;
    min-height: 1.2em; /* Prevent layout shift */
  }

  .cursor {
    animation: blink 1s step-end infinite;
    color: var(--accent-primary);
  }

  @keyframes blink { 50% { opacity: 0; } }

  .subtext {
    font-size: 1.25rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto 3rem auto;
  }

  .chaos-toggle {
    background: var(--bg-card);
    padding: 1rem 2rem;
    border-radius: var(--radius-lg);
    font-weight: 600;
    box-shadow: var(--shadow-soft);
    transition: transform 0.2s, box-shadow 0.2s;
    border: 2px solid transparent;
  }

  .chaos-toggle:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(196, 181, 253, 0.4);
    border-color: var(--accent-primary);
  }

  /* Chaos Mode Styles */
  .chaos .title {
    animation: glitch 0.3s infinite;
  }

  .chaos-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  .emoji-rain {
    position: absolute;
    top: -50px;
    animation: drop 3s linear infinite;
  }

  @keyframes drop {
    to { transform: translateY(110vh) rotate(360deg); }
  }

  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }
</style>
