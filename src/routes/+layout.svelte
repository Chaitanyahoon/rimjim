<script>
  import '../app.css';
</script>

<div class="app-container">
  <slot />
</div>

<style>
  .app-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
