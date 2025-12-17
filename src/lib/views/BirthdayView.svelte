<script>
  import { fade } from 'svelte/transition';
  import { rimjimData } from '../data';
  import WholeCake from '../components/WholeCake.svelte';
</script>

<div class="view-container" in:fade>
  <div class="content">
    <h2 class="title">{rimjimData.birthday.title}</h2>
      
    <WholeCake />
    
    <!-- Message is handled inside WholeCake or we can pass a prop, 
         but for now let's keep it simple and just show the message below if we wanted,
         but WholeCake shows confetti. We can duplicate the message logic there or 
         just show the title here. Let's add the hidden message after user interaction via a store or event.
         Simpler: Just show the cake. The cake handles the reveal? 
         Plan said: "Replace single candle with Whole Cake". 
         I'll trust the Cake component handles visual feedback. 
         But wait, the hidden message is important. 
         Let's just put the hidden message directly in the Cake component or here? 
         I added 'messageRevealed' logic in WholeCake component but didn't pass the text.
         Let's update this file to just host the Cake and maybe static text.
         Actually, I didn't export messageRevealed from WholeCake. 
         I will modify WholeCake later or just use it as is. 
         Let's stick to the Cake component doing the heavy lifting.
    -->
     <div class="message-area">
       <p class="hidden-message">
         {rimjimData.birthday.hiddenMessage}
       </p>
     </div>
  </div>
</div>

<style>
  .view-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: radial-gradient(circle at center, #fffbeb 0%, var(--bg-dark) 70%);
    overflow-y: auto;
    padding-bottom: 6rem;
  }

  .content {
    width: 100%;
    max-width: 800px;
    padding: 2rem;
  }

  .title {
    font-size: 3rem;
    margin-bottom: 3rem;
    color: #b45309; /* Darker warm tone */
  }

  .message-area {
    margin-top: 3rem;
    min-height: 100px;
  }

  .hidden-message {
    font-size: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
    color: var(--text-primary);
    opacity: 0;
    animation: fadeIn 2s forwards;
    animation-delay: 3s; /* Wait for candles */
  }

  @keyframes fadeIn { to { opacity: 1; } }
</style>
