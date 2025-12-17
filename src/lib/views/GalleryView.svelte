<script>
  import { fade, fly } from 'svelte/transition';
  import { rimjimData } from '../data';

  // Simple grid for now, can be upgraded to masonry if needed
</script>

<div class="view-container" in:fade>
  <h2 class="title">Visual Diary 📸</h2>
  
  <div class="gallery-grid">
    {#each rimjimData.gallery as item, i}
      <div 
        class="gallery-item" 
        style="background: {item.color}; transform: rotate({Math.random() * 6 - 3}deg);"
        in:fly="{{ y: 50, delay: i * 100 }}"
      >
        <div class="placeholder-img">
          <span>{item.caption.split(' ')[1] || '📷'}</span>
        </div>
        <p class="caption">{item.caption}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .view-container {
    height: 100%;
    overflow-y: auto;
    padding: 2rem 2rem 15rem 2rem; /* Massive bottom padding for Dock */
    text-align: center;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--text-primary);
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1.5rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .gallery-item {
    background: var(--bg-card);
    padding: 0.5rem;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card); /* Soft shadow */
    transition: transform 0.3s ease;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.7); /* Frosted */
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .gallery-item:hover {
    transform: scale(1.05) rotate(0deg) !important;
    z-index: 10;
  }

  .placeholder-img {
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    border-radius: var(--radius-md);
    background: rgba(0,0,0,0.1);
    margin-bottom: 0.5rem;
  }

  .caption {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-primary);
    padding-bottom: 0.5rem;
  }
</style>
