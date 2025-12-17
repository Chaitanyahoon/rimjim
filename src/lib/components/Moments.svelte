<script>
  import { scale, fade } from 'svelte/transition';
  import { rimjimData } from '../data';
  import { inview } from '../actions';

  let visible = false;
</script>

<section 
  class="moments-section"
  use:inview={{ threshold: 0.2 }}
  on:enter={() => visible = true}
>
  <div class="container">
    <h2 class="section-title">Moments That Live Rent-Free</h2>
    
    <div class="moments-grid">
      {#if visible}
        {#each rimjimData.moments as moment, i}
          <div 
            class="moment-card"
            in:scale="{{ duration: 600, delay: 200 + (i * 150), start: 0.9 }}"
            style="--delay: {i * 0.1}s"
          >
            <p>{moment.text}</p>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</section>

<style>
  .moments-section {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, var(--bg-dark) 0%, rgba(167, 139, 250, 0.05) 50%, var(--bg-dark) 100%);
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
    color: var(--text-primary);
  }

  .moments-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }

  .moment-card {
    background: rgba(255, 255, 255, 0.03);
    padding: 2rem;
    border-radius: var(--radius-lg);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    max-width: 300px;
    flex: 1 1 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 200px;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    cursor: default;
  }

  .moment-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    background: rgba(255, 255, 255, 0.05);
  }

  .moment-card p {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-primary);
  }
</style>
