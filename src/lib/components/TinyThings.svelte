<script>
  import { scale } from 'svelte/transition';
  import { spring } from 'svelte/motion';
  import { rimjimData } from '../data';
  import { inview } from '../actions';

  let visible = false;
</script>

<section 
  class="tiny-section"
  use:inview={{ threshold: 0.2 }}
  on:enter={() => visible = true}
>
  <div class="container">
    <h2 class="section-title">Tiny Rimjim Things 🧸</h2>
    
    <div class="grid">
      {#if visible}
        {#each rimjimData.tinyThings as item, i}
          <div 
            class="tiny-item"
            in:scale="{{ duration: 400, delay: 300 + (i * 100), start: 0.5 }}"
          >
            <span class="emoji">{item.emoji}</span>
            <p>{item.text}</p>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</section>

<style>
  .tiny-section {
    padding: 6rem 2rem;
    text-align: center;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 2rem;
  }

  .tiny-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy */
  }

  .tiny-item:hover {
    transform: translateY(-5px) scale(1.1);
  }

  .emoji {
    font-size: 3rem;
    display: block;
    margin-bottom: 0.5rem;
  }

  .tiny-item p {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.4;
  }
</style>
