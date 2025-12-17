<script>
  import { currentView } from "$lib/store";
  import { fade } from "svelte/transition";
  import Dock from "$lib/components/Dock.svelte";
  import GalaxyBackground from "$lib/components/GalaxyBackground.svelte";

  import HomeView from "$lib/views/HomeView.svelte";
  import RoastView from "$lib/views/RoastView.svelte";
  import FunView from "$lib/views/FunView.svelte";
  import AppreciationView from "$lib/views/AppreciationView.svelte";
  import VibeView from "$lib/views/VibeView.svelte";
  import BirthdayView from "$lib/views/BirthdayView.svelte";
  import PetView from "$lib/views/PetView.svelte";
</script>

<GalaxyBackground />

<main class="app-shell">
  {#key $currentView}
    <div
      class="view-wrapper"
      in:fade={{ duration: 300 }}
      out:fade={{ duration: 300 }}
    >
      {#if $currentView === "home"}
        <HomeView />
      {:else if $currentView === "roast"}
        <RoastView />
      {:else if $currentView === "fun"}
        <FunView />
      {:else if $currentView === "pet"}
        <PetView />
      {:else if $currentView === "appreciation"}
        <AppreciationView />
      {:else if $currentView === "vibe"}
        <VibeView />
      {:else if $currentView === "birthday"}
        <BirthdayView />
      {/if}
    </div>
  {/key}

  <Dock />
</main>

<style>
  .app-shell {
    width: 100%;
    height: 100dvh;
    overflow: hidden;
    position: relative;
    background: var(--bg-dark);
    display: flex;
    flex-direction: column;
  }

  .view-wrapper {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
</style>
