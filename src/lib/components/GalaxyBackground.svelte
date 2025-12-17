<script>
  import { onMount } from 'svelte';

  let canvas;
  let ctx;
  let stars = [];
  let width, height;

  const STAR_COUNT = 300;

  function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        alpha: Math.random()
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    // ctx.fillStyle = '#fdf2f8'; // Already set by app-shell, but we want stars on top
    // Actually, background is transparent to let CSS background show, stars are white/colored
    
    stars.forEach(star => {
      // Vivid Confetti/Pollen colors
      const colorType = Math.random();
      if (colorType > 0.75) ctx.fillStyle = `rgba(236, 72, 153, ${star.alpha})`; // Pink
      else if (colorType > 0.5) ctx.fillStyle = `rgba(245, 158, 11, ${star.alpha})`; // Amber
      else if (colorType > 0.25) ctx.fillStyle = `rgba(13, 148, 136, ${star.alpha})`; // Teal
      else ctx.fillStyle = `rgba(99, 102, 241, ${star.alpha})`; // Indigo

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      // Move star
      star.y -= star.speed;
      if (star.y < 0) {
        star.y = height;
        star.x = Math.random() * width;
      }
    });

    requestAnimationFrame(animate);
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
    resize();
    animate();

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  });
</script>

<canvas bind:this={canvas} class="galaxy-canvas"></canvas>

<style>
  .galaxy-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0; /* Behind everything */
    pointer-events: none;
    opacity: 0.6;
  }
</style>
