<script>
  import { currentView } from '$lib/store';
  import { fade } from 'svelte/transition';
  import Dock from '$lib/components/Dock.svelte';
  import GalaxyBackground from '$lib/components/GalaxyBackground.svelte';
  
  import HomeView from '$lib/views/HomeView.svelte';
  import RoastView from '$lib/views/RoastView.svelte';
  import VibeView from '$lib/views/VibeView.svelte';
  import BirthdayView from '$lib/views/BirthdayView.svelte';
</script>

<GalaxyBackground />

<main class="app-shell">
  {#key $currentView}
    <div class="view-wrapper" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
      {#if $currentView === 'home'}
        <HomeView />
      {:else if $currentView === 'roast'}
        <RoastView />
      {:else if $currentView === 'vibe'}
        <VibeView />
      {:else if $currentView === 'birthday'}
        <BirthdayView />
      {/if}
    </div>
  {/key}

  <Dock />
</main>

<style>
  .app-shell {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background: var(--bg-dark);
  }
</style>
