<script>
  import { onMount } from 'svelte';
  import { sfx } from '../sounds';

  let position = { x: 50, y: 100 };
  let isDragging = false;
  let offset = { x: 0, y: 0 };
  let noteText = "Write something...";

  function startDrag(e) {
    isDragging = true;
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    offset.x = clientX - position.x;
    offset.y = clientY - position.y;
    sfx.playClick();
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('touchmove', onDrag);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
  }

  function onDrag(e) {
    if (!isDragging) return;
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    position.x = clientX - offset.x;
    position.y = clientY - offset.y;
  }

  function stopDrag() {
    isDragging = false;
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('touchmove', onDrag);
    window.removeEventListener('mouseup', stopDrag);
    window.removeEventListener('touchend', stopDrag);
    sfx.playPop();
  }
</script>

<div 
  class="sticky-note" 
  style="top: {position.y}px; left: {position.x}px;"
  on:mousedown={startDrag}
  on:touchstart|nonpassive={startDrag}
>
  <div class="pin">📌</div>
  <textarea bind:value={noteText} on:mousedown|stopPropagation></textarea>
</div>

<style>
  .sticky-note {
    position: absolute;
    width: 200px;
    height: 200px;
    background: #fef3c7; /* Pastel yellow */
    padding: 1rem;
    box-shadow: 5px 5px 15px rgba(0,0,0,0.1);
    transform: rotate(-2deg);
    z-index: 50;
    cursor: grab;
    transition: transform 0.2s;
    border-radius: 2px;
  }

  .sticky-note:active {
    cursor: grabbing;
    transform: rotate(0deg) scale(1.05);
    z-index: 60;
  }

  .pin {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
    pointer-events: none;
  }

  textarea {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    resize: none;
    font-family: 'Indie Flower', cursive, sans-serif; /* Handwriting if available, else sans */
    font-size: 1.2rem;
    color: #4b5563;
    outline: none;
  }
</style>
