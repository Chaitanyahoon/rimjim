<script>
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import confetti from 'canvas-confetti';
  import { sfx } from '../sounds';

  let candlesLit = 0;
  const totalCandles = 5; // Arbitrary number for fun
  let messageRevealed = false;

  function lightCandle(index) {
    if (candlesLit < totalCandles) {
      // Logic to prevent re-lighting same candle not strictly needed if we just count clicks or track state per candle
      // For simplicity, we just count up.
      candlesLit++;
      sfx.playWhoosh();
      
      if (candlesLit === totalCandles) {
        setTimeout(() => {
          messageRevealed = true;
          sfx.playPop();
          confetti({
             particleCount: 200,
             spread: 100,
             origin: { y: 0.6 },
             colors: ['#c4b5fd', '#fbcfe8', '#fde68a'] // Pastel confetti
          });
        }, 500);
      }
    }
  }
</script>

<div class="cake-container">
  <div class="cake">
    <div class="plate"></div>
    <div class="layer layer-bottom"></div>
    <div class="layer layer-middle"></div>
    <div class="layer layer-top"></div>
    <div class="icing"></div>
    
    <div class="candles">
      {#each Array(totalCandles) as _, i}
        <button 
          class="candle" 
          on:click={() => lightCandle(i)}
          disabled={messageRevealed} 
          style="left: {20 + i * 15}%; --delay: {i * 0.1}s"
        >
          <div class="flame {i < candlesLit ? 'lit' : ''}"></div>
          <div class="wick"></div>
          <div class="wax"></div>
        </button>
      {/each}
    </div>
  </div>

  {#if !messageRevealed}
    <p class="instruction" in:fade>Light all the candles! ({candlesLit}/{totalCandles})</p>
  {/if}
</div>

<style>
  .cake-container {
    position: relative;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }

  .cake {
    position: relative;
    width: 250px;
    height: 140px;
    z-index: 10;
  }

  .plate {
    width: 270px;
    height: 10px;
    background: #cbd5e1;
    position: absolute;
    bottom: 0;
    left: -10px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  .layer {
    position: absolute;
    width: 100%;
    left: 0;
    border-radius: 10px;
  }

  .layer-bottom {
    height: 50px;
    bottom: 10px;
    background: #fbcfe8; /* Pink sponge */
    border-bottom: 5px solid #f9a8d4;
  }

  .layer-middle {
    height: 40px;
    bottom: 60px;
    background: #fdf2f8; /* Cream filling */
    width: 90%;
    left: 5%;
  }

  .layer-top {
    height: 50px;
    bottom: 100px;
    background: #fbcfe8;
    width: 100%;
    border-radius: 10px 10px 5px 5px;
  }

  .icing {
    position: absolute;
    top: -10px;
    left: -5px;
    width: 260px;
    height: 60px;
    background: #8b5cf6; /* Purple icing */
    border-radius: 30px 30px 10px 10px;
    z-index: 2;
    background: radial-gradient(circle at 20px 0, #a78bfa 15px, transparent 16px) repeat-x;
    background-size: 40px 60px; 
    top: -15px;
    /* Simplification: Just a solid block for icing with rounded top */
    background: #c4b5fd;
    transform: translateY(-5px);
  }

  .candles {
    position: absolute;
    top: -40px;
    width: 100%;
    height: 50px;
    z-index: 5;
  }

  .candle {
    position: absolute;
    bottom: 0;
    width: 12px;
    height: 40px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .candle:hover { transform: scale(1.1); }

  .wax {
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(45deg, #fff, #fff 5px, #fcd34d 5px, #fcd34d 10px);
    border-radius: 2px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
  }

  .wick {
    width: 2px;
    height: 8px;
    background: #475569;
    margin: 0 auto;
    position: relative;
    top: 0;
  }

  .flame {
    width: 14px;
    height: 20px;
    background: #fbbf24;
    border-radius: 50% 50% 20% 20%;
    position: absolute;
    top: -18px;
    left: -1px;
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.3s ease;
    box-shadow: 0 0 10px #fbbf24;
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

  .instruction {
    margin-top: 1rem;
    font-size: 1.1rem;
    color: var(--text-secondary);
  }
</style>
