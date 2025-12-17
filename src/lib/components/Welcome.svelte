<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { rimjimData } from '../data';

  let visible = false;

  onMount(() => {
    visible = true;
  });
</script>

<section class="welcome-section">
  {#if visible}
    <div class="content">
      <h1 in:fly="{{ y: 20, duration: 1000, delay: 200 }}" class="title">
        {rimjimData.welcome.title}
      </h1>
      <p in:fade="{{ duration: 1500, delay: 800 }}" class="subtext">
        {rimjimData.welcome.subtext}
      </p>
    </div>
  {/if}

  <div class="background-particles">
    <!-- Optional: Add particles here later -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
  </div>
</section>

<style>
  .welcome-section {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    overflow: hidden;
    padding: 2rem;
  }

  .content {
    z-index: 10;
    position: relative;
  }

  .title {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, #e2e8f0, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.05em;
  }

  .subtext {
    font-size: 1.25rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* Soft Blob Background */
  .background-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.4;
  }

  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
  }

  .blob-1 {
    width: 400px;
    height: 400px;
    background: var(--accent-primary);
    top: 10%;
    left: 20%;
    animation: float 20s infinite ease-in-out;
  }

  .blob-2 {
    width: 300px;
    height: 300px;
    background: var(--accent-secondary);
    bottom: 20%;
    right: 15%;
    animation: float 25s infinite ease-in-out reverse;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-30px, 50px); }
  }

  @media (max-width: 768px) {
    .title {
      font-size: 2.5rem;
    }
  }
</style>
