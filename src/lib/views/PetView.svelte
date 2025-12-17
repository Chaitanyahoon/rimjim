<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import PixelPet from "../components/PixelPet.svelte"; // Reusing the component logic but in a new layout

    // We can add more environment details here since it's a full view
</script>

<div class="view-container" in:fade>
    <div class="pet-environment">
        <h1 class="title">Virtual Companion</h1>
        <div class="pet-stage">
            <PixelPet />
        </div>
        <p class="subtitle">Take care of your pocket friend!</p>
    </div>
</div>

<style>
    .view-container {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: radial-gradient(circle at center, #fef3c7 0%, #fff7ed 100%);
        padding-bottom: 80px; /* Space for Dock */
        box-sizing: border-box;
    }

    .pet-environment {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

    .title {
        font-size: 2.5rem;
        font-weight: 900;
        color: var(--accent-primary);
        letter-spacing: -1px;
    }

    .pet-stage {
        /* This wrapper can add stage effects or just center the "card" */
        transform: scale(1.2); /* Make it bigger for the main view */
    }

    .subtitle {
        color: var(--text-secondary);
        font-weight: 600;
    }
</style>
