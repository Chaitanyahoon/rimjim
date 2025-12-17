<script>
  import { fade, scale } from 'svelte/transition';
  import { rimjimData } from '../data';

  let activeIndex = 0;
  let isPlaying = false;

  function playTrack(index) {
    if (activeIndex === index && isPlaying) {
      isPlaying = false;
    } else {
      activeIndex = index;
      isPlaying = true;
    }
  }
</script>

<div class="view-container" in:fade>
  <div class="player-container">
    <div class="vinyl-wrapper">
      <div class="vinyl {isPlaying ? 'spinning' : ''}">
        <div class="label" style="background: var(--accent-cool)">
          <span class="note">🎵</span>
        </div>
      </div>
    </div>

    <div class="playlist">
      <h2>Vibes Playlist</h2>
      {#each rimjimData.soundtrack as song, i}
        <div 
          class="track {activeIndex === i ? 'active' : ''}"
          on:click={() => playTrack(i)}
        >
          <div class="track-info">
            <span class="title">{song.title}</span>
            <span class="artist">{song.artist}</span>
          </div>
          {#if activeIndex === i && isPlaying}
            <div class="equalizer">
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <div class="moments-scroller">
    {#each rimjimData.moments as moment}
      <div class="moment-card">
        <p>{moment.text}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .view-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem 15rem 1rem; /* Clear Dock */
    overflow-y: auto;
    align-items: center;
    width: 100%;
  }

  .player-container {
    display: flex;
    flex-direction: column; /* Mobile first */
    align-items: center;
    gap: 2rem;
    margin-bottom: 3rem;
    width: 100%;
    max-width: 800px;
  }

  @media(min-width: 768px) {
    .player-container {
      flex-direction: row;
      justify-content: center;
    }
  }

  .vinyl-wrapper {
    width: 250px;
    height: 250px;
    background: #e2e8f0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    position: relative;
  }

  .vinyl {
    width: 240px;
    height: 240px;
    background: #1e293b;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: repeating-radial-gradient(
      #1e293b,
      #1e293b 10px,
      #334155 11px
    );
    transition: transform 1s ease;
  }

  .vinyl.spinning {
    animation: spin 4s linear infinite;
  }

  @keyframes spin { 100% { transform: rotate(360deg); } }

  .label {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }

  .playlist {
    flex: 1;
    background: var(--bg-card);
    padding: 1.5rem;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    width: 100%;
  }

  .playlist h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }

  .track {
    padding: 0.8rem;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.2s;
    border-bottom: 1px solid #f1f5f9;
  }

  .track:last-child { border-bottom: none; }
  .track:hover { background: #f8fafc; }
  .track.active { background: #f0f9ff; }

  .track-info { display: flex; flex-direction: column; }
  .title { font-weight: 600; font-size: 0.95rem; }
  .artist { font-size: 0.8rem; color: var(--text-secondary); }

  .equalizer {
    display: flex;
    gap: 3px;
    height: 15px;
    align-items: flex-end;
  }

  .bar { width: 3px; background: var(--accent-cool); animation: eq 0.5s infinite; }
  .bar:nth-child(2) { animation-delay: 0.1s; }
  .bar:nth-child(3) { animation-delay: 0.2s; }

  @keyframes eq {
    0%, 100% { height: 5px; }
    50% { height: 15px; }
  }

  .moments-scroller {
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    width: 100%;
    padding: 1rem;
    /* Hide scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .moments-scroller::-webkit-scrollbar { display: none; }

  .moment-card {
    min-width: 200px;
    background: linear-gradient(135deg, #fff, #f8fafc);
    padding: 1.5rem;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid #e2e8f0;
  }
</style>
