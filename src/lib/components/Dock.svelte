<script>
  import { currentView } from "../store";

  const items = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "roast", label: "Roasts", icon: "💀" },
    { id: "vibe", icon: "🎧", label: "Vinyl Vibes" },
    { id: "fun", icon: "🎱", label: "Fun Zone" },
    { id: "pet", icon: "👾", label: "My Pet" },
    { id: "birthday", icon: "🎂", label: "Birthday" },
  ];

  let hoveredIndex = -1;

  function setView(view) {
    currentView.set(view);
  }
</script>

<div class="dock-container">
  <div class="dock" on:mouseleave={() => (hoveredIndex = -1)}>
    {#each items as item, i}
      <button
        class="dock-item {$currentView === item.id ? 'active' : ''}"
        on:click={() => setView(item.id)}
        on:mouseenter={() => (hoveredIndex = i)}
        style="--scale: {hoveredIndex === i
          ? 1.5
          : hoveredIndex !== -1 && Math.abs(hoveredIndex - i) === 1
            ? 1.2
            : 1}"
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
    border-radius: 3rem;
    display: flex;
    gap: 0.8rem;
    align-items: flex-end;
    box-shadow: var(--shadow-soft);

    /* Glass Effect */
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: var(--glass-border);
  }

  .dock-item {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale(var(--scale));
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.05);
    color: var(--text-secondary);
  }

  .dock-item:hover {
    background: #fff;
    color: var(--accent-primary);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .dock-item.active {
    background: var(--accent-primary);
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
    color: white;
    border: none;
  }

  .tooltip {
    position: absolute;
    top: -50px;
    background: rgba(30, 41, 59, 0.9);
    color: white;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.85rem;
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.2s,
      transform 0.2s;
    white-space: nowrap;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(10px);
    font-weight: 600;
  }

  .dock-item:hover .tooltip {
    opacity: 1;
    transform: translateY(0);
  }
</style>
