<script>
  import { slide, fade } from 'svelte/transition';
  import { rimjimData } from '../data';
  import { inview } from '../actions';

  let visible = false;
</script>

<section 
  class="soundtrack-section"
  use:inview={{ threshold: 0.2 }}
  on:enter={() => visible = true}
>
  <div class="container">
    <h2 class="section-title">Rimjim's Soundtrack 🎧</h2>
    
    <div class="playlist">
      {#if visible}
        {#each rimjimData.soundtrack as song, i}
          <div 
            class="song-row"
            in:slide="{{ duration: 500, delay: 200 + (i * 100) }}"
          >
            <div class="song-info">
              <span class="song-title">{song.title}</span>
              <span class="song-artist">{song.artist}</span>
            </div>
            <span class="mood-tag">{song.mood}</span>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</section>

<style>
  .soundtrack-section {
    padding: 6rem 2rem;
    display: flex;
    justify-content: center;
  }

  .container {
    max-width: 600px;
    width: 100%;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
    color: var(--text-primary);
  }

  .playlist {
    background: var(--bg-card);
    border-radius: var(--radius-md);
    padding: 1rem;
    box-shadow: var(--shadow-soft);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .song-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background-color 0.2s ease, transform 0.2s ease;
    cursor: pointer;
  }

  .song-row:last-child {
    border-bottom: none;
  }

  .song-row:hover {
    background-color: rgba(255, 255, 255, 0.05);
    transform: scale(1.02);
    border-radius: 8px; /* Local radius for hover item */
  }

  .song-info {
    display: flex;
    flex-direction: column;
  }

  .song-title {
    font-weight: 600;
    color: var(--text-primary);
  }

  .song-artist {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .mood-tag {
    font-size: 0.8rem;
    background: rgba(167, 139, 250, 0.1);
    color: var(--accent-primary);
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
  }
</style>
