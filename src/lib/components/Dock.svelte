<script>
  import { spring } from 'svelte/motion';
  import { currentView } from '../store';

  const items = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'roast', label: 'Roasts', icon: '💀' },
    { id: 'gallery', label: 'Gallery', icon: '📸' },
    { id: 'vibe', label: 'Vibe', icon: '🎵' },
    { id: 'birthday', label: 'B-Day', icon: '🎂' }
  ];

  let hoveredIndex = -1;

  function setView(view) {
    currentView.set(view);
  }
</script>

<div class="dock-container">
  <div class="dock" on:mouseleave={() => hoveredIndex = -1}>
    {#each items as item, i}
      <button 
        class="dock-item {$currentView === item.id ? 'active' : ''}"
        on:click={() => setView(item.id)}
        on:mouseenter={() => hoveredIndex = i}
        style="--scale: {hoveredIndex === i ? 1.5 : hoveredIndex !== -1 && Math.abs(hoveredIndex - i) === 1 ? 1.2 : 1}"
      >
        <span class="icon">{item.icon}</span>
        <span class="tooltip">{item.label}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .dock-container {
    position: fixed;
    bottom: 2rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 100;
  }

  .dock {
    padding: 0.8rem 1.5rem;
    border-radius: 2.5rem; 
    display: flex;
    gap: 0.8rem;
    align-items: flex-end;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1); /* Lighter shadow */
    
    /* Frosted Ice (Light Glass) */
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  .dock-item {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%; 
    background: rgba(255, 255, 255, 0.8); /* White items */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale(var(--scale));
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.05);
    color: var(--text-primary);
  }

  .dock-item:hover {
    background: rgba(236, 72, 153, 0.1); /* Pink tint */
    border-color: rgba(236, 72, 153, 0.3);
    z-index: 10;
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.2);
    transform: translateY(-5px) scale(1.2);
  }

  .dock-item.active {
    background: var(--accent-primary);
    box-shadow: 0 5px 15px rgba(236, 72, 153, 0.4);
    color: white;
    border: none;
  }

  .tooltip {
    position: absolute;
    top: -45px;
    background: white;
    color: var(--text-primary);
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 0.85rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s, transform 0.2s;
    white-space: nowrap;
    border: 1px solid rgba(0,0,0,0.05);
    box-shadow: var(--shadow-card);
    transform: translateY(5px);
    font-weight: 600;
  }

  .dock-item:hover .tooltip {
    opacity: 1;
    transform: translateY(0);
  }
</style>
