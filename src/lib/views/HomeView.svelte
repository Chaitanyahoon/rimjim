<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { rimjimData } from "../data";
  import { isChaosMode } from "../store";

  import StickyNote from "../components/StickyNote.svelte";
  import LoreCards from "../components/LoreCards.svelte";
  import { sfx } from "../sounds";

  let visible = false;
  let displayedText = "";
  let fullText = ""; // Logic in onMount
  let timeGreeting = "Hello";
  let currentVibe = "feral raccoon 🦝";

  // Typing effect
  onMount(() => {
    // Dynamic Greeting
    const hour = new Date().getHours();
    if (hour < 12) timeGreeting = "Good Morning";
    else if (hour < 18) timeGreeting = "Good Afternoon";
    else timeGreeting = "Good Evening";

    // Random Vibe
    const vibes = [
      "stardust ✨",
      "chaos 🌪️",
      "caffeine ☕",
      "anxiety 📉",
      "pizza 🍕",
    ];
    currentVibe = vibes[Math.floor(Math.random() * vibes.length)];

    // Typewriter
    fullText = `A tiny universe made of ${currentVibe}`;
    visible = true;
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        displayedText += fullText[i];
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  });

  function toggleChaos() {
    isChaosMode.update((n) => !n);
    sfx.playWhoosh();
  }
</script>

<StickyNote />

<div class="view-container {$isChaosMode ? 'chaos' : ''}" in:fade>
  <div class="hero-content">
    <div class="greeting-pill" in:fly={{ y: -20, delay: 500 }}>
      {timeGreeting}, Starstuff.
    </div>

    <h1 class="title">
      {rimjimData.welcome.title}
    </h1>

    <div class="typing-container">
      <p class="subtext">
        {displayedText}<span class="cursor">|</span>
      </p>
    </div>

    <button class="chaos-toggle" on:click={toggleChaos}>
      {#if $isChaosMode}
        🚫 Deactivate Chaos
      {:else}
        ⚡ Unleash Chaos
      {/if}
    </button>
  </div>

  <div class="scroll-content">
    <LoreCards />
  </div>

  {#if $isChaosMode}
    <div class="chaos-overlay">
      {#each Array(20) as _, i}
        <div
          class="emoji-rain"
          style="left: {Math.random() * 100}%; animation-delay: {Math.random() *
            2}s; font-size: {Math.random() * 2 + 1}rem"
        >
          {["👽", "👾", "🌈", "🍕", "💩", "🦄"][Math.floor(Math.random() * 6)]}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .view-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow-y: auto; /* Enable scroll for new longer content */
    overflow-x: hidden;
    padding-bottom: 8rem;
    scrollbar-width: thin;
    scrollbar-color: var(--accent-primary) transparent;
  }

  .view-container::-webkit-scrollbar {
    width: 6px;
  }
  .view-container::-webkit-scrollbar-thumb {
    background-color: var(--accent-primary);
    border-radius: 3px;
  }

  .hero-content {
    z-index: 10;
    padding: 1rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: 2rem;
    flex-shrink: 0;
  }

  .greeting-pill {
    background: rgba(255, 255, 255, 0.7);
    padding: 0.5rem 1.5rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    color: var(--text-secondary);
    font-weight: 600;
  }

  .scroll-content {
    width: 100%;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    padding-bottom: 2rem;
  }

  .title {
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
    background: linear-gradient(
      135deg,
      var(--accent-primary),
      var(--accent-secondary)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.05em;
    line-height: 1.1;
  }

  /* Responsive Text */
  @media (max-width: 600px) {
    .title {
      font-size: 2.8rem;
    }
  }

  .cursor {
    animation: blink 1s step-end infinite;
    color: var(--accent-primary);
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  .subtext {
    font-size: 1.5rem;
    color: var(--text-primary);
    max-width: 600px;
    margin: 0 auto 2rem auto;
    font-family: "Courier New", monospace; /* Typewriter feel */
    font-weight: 600;
  }

  .chaos-toggle {
    background: var(--bg-card);
    padding: 1rem 2.5rem;
    border-radius: var(--radius-lg);
    font-weight: 700;
    box-shadow: var(--shadow-soft);
    transition: all 0.2s;
    border: 2px solid transparent;
    cursor: pointer;
    font-size: 1.1rem;
  }

  .chaos-toggle:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(255, 107, 53, 0.3);
    border-color: var(--accent-primary);
    color: var(--accent-primary);
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
    to {
      transform: translateY(110vh) rotate(360deg);
    }
  }

  @keyframes glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }
</style>
