<script>
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";
  import confetti from "canvas-confetti";
  import { sfx } from "../sounds";

  let candlesLit = 0;
  const totalCandles = 5;
  let messageRevealed = false;

  function lightCandle(index) {
    if (candlesLit < totalCandles) {
      candlesLit++;
      sfx.playWhoosh();
      if (candlesLit === totalCandles) {
        setTimeout(() => {
          messageRevealed = true;
          sfx.playPop();
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
            colors: ["#FFD700", "#FF69B4", "#00BFFF"],
          });
        }, 600);
      }
    }
  }
</script>

<div class="cake-container">
  <!-- Cake Base -->
  <div class="cake">
    <!-- Plate -->
    <div class="plate"></div>

    <!-- Tier 1 (Bottom) -->
    <div class="tier tier-bottom">
      <div class="side"></div>
      <div class="top"></div>
    </div>

    <!-- Tier 2 (Middle) -->
    <div class="tier tier-middle">
      <div class="side"></div>
      <div class="top"></div>
    </div>

    <!-- Tier 3 (Top) -->
    <div class="tier tier-top">
      <div class="side"></div>
      <div class="top"></div>
      <!-- Toppers -->
      <div class="decor">
        {#if messageRevealed}
          <div class="topper-msg" in:scale>🎉 Happy Birthday! 🎉</div>
        {/if}
      </div>
    </div>

    <!-- Candles -->
    <div class="candles-container">
      {#each Array(totalCandles) as _, i}
        <div class="candle-wrapper" style="left: {-60 + i * 30}px">
          <button
            class="candle"
            on:click={() => lightCandle(i)}
            disabled={messageRevealed}
          >
            <div class="wax"></div>
            <div class="flame {i < candlesLit ? 'lit' : ''}"></div>
          </button>
        </div>
      {/each}
    </div>
  </div>

  {#if !messageRevealed}
    <div class="hint" in:fade>Make a wish & light the candles!</div>
  {/if}
</div>

<style>
  .cake-container {
    position: relative;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 2rem;
  }

  /* 3D Cake Construction Using pseudo-elements & gradients */
  .cake {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    perspective: 1000px;
  }

  .plate {
    position: absolute;
    bottom: -10px;
    width: 320px;
    height: 100px;
    background: #f8fafc; /* White porcelain */
    border-radius: 50%;
    box-shadow:
      0 15px 30px rgba(0, 0, 0, 0.2),
      inset 0 0 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    z-index: 1;
  }

  .tier {
    position: relative;
    border-radius: 50%;
  }

  /* Common Tier Logic */
  .side {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      to right,
      #e2e8f0,
      #f8fafc 40%,
      #e2e8f0
    ); /* Base shade */
    border-radius: 50% 50% 50% 50% / 20% 20% 10% 10%; /* Rounded bottom cylinder feel */
    z-index: 2;
  }

  .top {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -40%; /* Flattened top */
    left: 0;
    background: #f1f5f9;
    border-radius: 50%;
    z-index: 3;
    transform: scaleY(0.4); /* Make it an ellipse */
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  /* Colors */
  /* Bottom: Orange/Mango */
  .tier-bottom {
    width: 280px;
    height: 90px;
    z-index: 2;
    margin-bottom: -30px; /* Stack overlap */
  }
  .tier-bottom .side {
    background: linear-gradient(90deg, #fdba74, #fb923c 30%, #fdba74 80%);
    box-shadow: inset 0 -5px 10px rgba(0, 0, 0, 0.1);
  }
  .tier-bottom .top {
    background: #ffedd5;
  }

  /* Middle: Pink/Berry */
  .tier-middle {
    width: 220px;
    height: 80px;
    z-index: 3;
    margin-bottom: -25px;
  }
  .tier-middle .side {
    background: linear-gradient(90deg, #fca5a5, #f87171 30%, #fca5a5 80%);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  .tier-middle .top {
    background: #ffe4e6;
  }

  /* Top: Cream/Vanilla */
  .tier-top {
    width: 160px;
    height: 70px;
    z-index: 4;
  }
  .tier-top .side {
    background: linear-gradient(90deg, #fcd34d, #fbbf24 30%, #fcd34d 80%);
  }
  .tier-top .top {
    background: #fffbeb;
  }

  /* Topper */
  .topper-msg {
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background: white;
    padding: 5px 15px;
    border-radius: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    font-weight: bold;
    color: #ef4444;
    font-family: "Poppins", sans-serif;
    z-index: 20;
  }

  /* Candles Logic */
  .candles-container {
    position: absolute;
    top: 20px; /* Adjust to sit on top tier */
    left: 50%;
    z-index: 10;
  }

  .candle-wrapper {
    position: absolute;
    bottom: 0;
  }

  .candle {
    border: none;
    background: none;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s;
  }
  .candle:hover {
    transform: scale(1.1);
  }

  .wax {
    width: 8px;
    height: 40px;
    background: repeating-linear-gradient(
      45deg,
      #60a5fa,
      #60a5fa 5px,
      white 5px,
      white 10px
    );
    border-radius: 2px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  .flame {
    width: 12px;
    height: 20px;
    background: #facc15;
    border-radius: 50% 50% 20% 20%;
    position: absolute;
    top: -18px;
    left: -2px;
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.3s;
    box-shadow: 0 0 10px #facc15;
  }

  .flame.lit {
    opacity: 1;
    transform: scale(1);
    animation: flicker 0.5s infinite alternate;
  }

  @keyframes flicker {
    from {
      transform: scale(1) rotate(-2deg);
    }
    to {
      transform: scale(1.1) rotate(2deg);
      opacity: 0.9;
    }
  }

  .hint {
    margin-top: 3rem;
    font-weight: 500;
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.7);
    padding: 0.5rem 1rem;
    border-radius: 50px;
  }
</style>
