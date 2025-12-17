<script>
  import { fade, scale } from 'svelte/transition';
  import { rimjimData } from '../data';
  import { inview } from '../actions';
  import confetti from 'canvas-confetti';

  let visible = false;
  let isLit = false;

  function lightCandle() {
    isLit = true;
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#a78bfa', '#f472b6', '#fbbf24']
    });
  }
</script>

<section 
  class="birthday-section"
  use:inview={{ threshold: 0.3 }}
  on:enter={() => visible = true}
>
  <div class="content">
    {#if visible}
      <h2 in:scale="{{ duration: 800 }}" class="title">{rimjimData.birthday.title}</h2>
      
      <div class="candle-container">
        <div class="candle">
          <div class="flame {isLit ? 'lit' : ''}"></div>
          <div class="wick"></div>
          <div class="wax"></div>
        </div>
      </div>

      {#if !isLit}
        <button 
          on:click={lightCandle} 
          class="light-btn"
          in:fade="{{ delay: 1000 }}"
        >
          🕯️ Light the Candle
        </button>
      {:else}
        <div class="message-container" in:fade="{{ duration: 1500 }}">
          <p class="hidden-message">
            {rimjimData.birthday.hiddenMessage}
          </p>
        </div>
      {/if}
    {/if}
  </div>
</section>

<style>
  .birthday-section {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: radial-gradient(circle at center, #1e1b4b 0%, var(--bg-dark) 70%);
    padding: 2rem;
  }

  .title {
    font-size: 3rem;
    margin-bottom: 3rem;
    color: var(--accent-warm);
    text-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
  }

  .candle-container {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 3rem;
    position: relative;
  }

  .candle {
    position: relative;
    width: 40px;
  }

  .wax {
    width: 40px;
    height: 120px;
    background: #e2e8f0;
    border-radius: 4px;
    box-shadow: inset -5px -5px 10px rgba(0,0,0,0.1);
  }

  .wick {
    width: 4px;
    height: 15px;
    background: #64748b;
    margin: 0 auto;
    position: relative;
    top: 5px;
  }

  .flame {
    width: 20px;
    height: 35px;
    background: #fbbf24;
    border-radius: 50% 50% 20% 20%;
    position: absolute;
    top: -35px;
    left: 10px;
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.5s ease;
    box-shadow: 0 0 10px #fbbf24, 0 0 20px #f59e0b, 0 0 40px #b45309;
  }

  .flame.lit {
    opacity: 1;
    transform: scale(1);
    animation: flicker 1s infinite alternate;
  }

  @keyframes flicker {
    0% { transform: scale(1) rotate(-2deg); opacity: 0.9; }
    100% { transform: scale(1.1) rotate(2deg); opacity: 1; }
  }

  .light-btn {
    background: var(--bg-card);
    color: var(--text-primary);
    padding: 1rem 2rem;
    border-radius: 2rem;
    font-size: 1.2rem;
    border: 1px solid rgba(255,255,255,0.1);
    transition: all 0.3s ease;
  }

  .light-btn:hover {
    background: var(--accent-primary);
    color: #1a1b32; /* dark text on light accent */
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(167, 139, 250, 0.4);
  }

  .hidden-message {
    font-size: 1.5rem;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    font-weight: 300;
    color: var(--text-primary);
  }
</style>
