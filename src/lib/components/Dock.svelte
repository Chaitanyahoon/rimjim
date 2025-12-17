<script>
  import { spring } from 'svelte/motion';
  import { currentView } from '../store';

  const items = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'roast', label: 'Roasts', icon: '💀' },
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
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.8rem;
    border-radius: 2rem;
    display: flex;
    gap: 0.8rem;
    align-items: flex-end;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  .dock-item {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 1rem;
    background: rgba(30, 41, 59, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale(var(--scale));
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .dock-item:hover {
    background: rgba(167, 139, 250, 0.2);
    border-color: rgba(167, 139, 250, 0.4);
    z-index: 10;
  }

  .dock-item.active {
    background: var(--accent-primary);
    box-shadow: 0 0 15px rgba(167, 139, 250, 0.5);
  }

  .dock-item::after {
    content: '';
    position: absolute;
    bottom: -6px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: white;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .dock-item.active::after {
    opacity: 1;
  }

  .tooltip {
    position: absolute;
    top: -40px;
    background: rgba(15, 23, 42, 0.9);
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.8rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    white-space: nowrap;
  }

  .dock-item:hover .tooltip {
    opacity: 1;
  }
</style>
