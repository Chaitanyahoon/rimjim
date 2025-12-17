<script>
  import { fly } from 'svelte/transition';
  import { rimjimData } from '../data';
  import { inview } from '../actions';

  let visible = false;
</script>

<section 
  class="about-section"
  use:inview={{ threshold: 0.3 }}
  on:enter={() => visible = true}
>
  <div class="container">
    {#if visible}
      <h2 in:fly="{{ x: -50, duration: 800 }}" class="section-title">
        {rimjimData.about.title}
      </h2>
      
      <div class="traits-grid">
        {#each rimjimData.about.traits as trait, i}
          <div 
            class="trait-card"
            in:fly="{{ y: 30, duration: 600, delay: 300 + (i * 100) }}"
          >
            <span class="icon">{trait.icon}</span>
            <p class="text">{trait.text}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  .about-section {
    min-height: 80vh;
    padding: 4rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    max-width: 800px;
    width: 100%;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--accent-primary);
    text-align: left;
  }

  .traits-grid {
    display: grid;
    gap: 1.5rem;
  }

  .trait-card {
    background: var(--bg-card);
    padding: 1.5rem;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .trait-card:hover {
    transform: translateX(10px) scale(1.02);
    box-shadow: var(--shadow-soft);
    border-color: rgba(167, 139, 250, 0.3);
  }

  .icon {
    font-size: 2rem;
  }

  .text {
    font-size: 1.1rem;
    color: var(--text-primary);
  }
</style>
