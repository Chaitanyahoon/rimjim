<script>
    import { onMount } from "svelte";
    import { fade, fly, scale } from "svelte/transition";
    import { rimjimData } from "../data";
    import { sfx } from "../sounds";

    let bubbles = [];
    let selectedMessage = null;

    // Generate floating hearts/bubbles
    onMount(() => {
        const messages = rimjimData.appreciation || [];
        bubbles = messages.map((item, i) => ({
            ...item,
            x: Math.random() * 80 + 10, // 10% to 90%
            delay: Math.random() * 5,
            scale: Math.random() * 0.5 + 0.8,
            speed: Math.random() * 10 + 15 + "s",
            type: Math.random() > 0.7 ? "bottle" : "heart", // 30% bottles, 70% hearts
        }));
    });

    function openMessage(bubble) {
        selectedMessage = bubble;
        sfx.playPop();
    }

    function closeMessage() {
        selectedMessage = null;
    }
</script>

<div class="ocean-container" in:fade>
    <div class="water-bg"></div>
    <div class="sun-glow"></div>

    <h2 class="page-title">Floating Thoughts 🌊</h2>

    {#each bubbles as bubble, i}
        <button
            class="floater {bubble.type}"
            style="left: {bubble.x}%; animation-delay: -{bubble.delay}s; animation-duration: {bubble.speed}; transform: scale({bubble.scale})"
            on:click={() => openMessage(bubble)}
        >
            <span class="icon">{bubble.type === "bottle" ? "🍾" : "🧡"}</span>
        </button>
    {/each}

    {#if selectedMessage}
        <div class="message-modal" in:scale={{ duration: 300, start: 0.8 }}>
            <div class="modal-content">
                <button class="close-btn" on:click={closeMessage}>×</button>
                <div class="modal-icon">
                    {selectedMessage.type === "bottle" ? "📜" : "💌"}
                </div>
                <p class="message-text">"{selectedMessage.text}"</p>
                <div class="modal-decoration">~ RimJhim ~</div>
            </div>
            <div class="modal-backdrop" on:click={closeMessage}></div>
        </div>
    {/if}
</div>

<style>
    .ocean-container {
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
        background: linear-gradient(to top, #fff1f2 0%, #fff7ed 100%);
    }

    /* Tropical Background Elements */
    .water-bg {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40%;
        background: linear-gradient(to top, #ffccbd 0%, transparent 100%);
        opacity: 0.5;
        z-index: 0;
    }

    .sun-glow {
        position: absolute;
        top: -10%;
        right: -10%;
        width: 50vw;
        height: 50vw;
        background: radial-gradient(
            circle,
            rgba(255, 107, 53, 0.1) 0%,
            transparent 70%
        );
        pointer-events: none;
    }

    .page-title {
        position: absolute;
        top: 2rem;
        width: 100%;
        text-align: center;
        font-size: 2rem;
        font-weight: 800;
        color: var(--text-secondary);
        z-index: 10;
        text-transform: uppercase;
        letter-spacing: 2px;
        opacity: 0.6;
    }

    /* Floating Elements */
    .floater {
        position: absolute;
        bottom: -100px;
        background: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        padding: 1rem;
        cursor: pointer;
        transition: transform 0.2s;
        animation-name: floatUp;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        z-index: 5;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        box-shadow: 0 4px 15px rgba(255, 107, 53, 0.1);
    }

    .floater.bottle {
        border-radius: 12px; /* Slight rounded rect for bottles */
        background: rgba(255, 255, 255, 0.6);
        font-size: 1.5rem;
    }

    .floater:hover {
        background: white;
        transform: scale(1.2) !important;
        box-shadow: 0 0 20px rgba(255, 107, 53, 0.4);
        z-index: 20;
        animation-play-state: paused; /* Fixes flicker by stopping movement on interaction */
    }

    .icon {
        font-size: 1.8rem;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }

    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            bottom: -10%;
        }
        100% {
            transform: translateY(-120vh) rotate(360deg);
            bottom: 120%;
        }
    }

    /* Modal Styling */
    .message-modal {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
        padding: 1rem;
    }

    .modal-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(255, 247, 237, 0.6); /* Warm tint backdrop */
        backdrop-filter: blur(8px);
        z-index: -1;
    }

    .modal-content {
        background: white;
        padding: 3rem 2rem;
        border-radius: var(--radius-lg);
        max-width: 400px;
        width: 100%;
        text-align: center;
        box-shadow: var(--shadow-float);
        border: 2px solid rgba(255, 107, 53, 0.1);
        position: relative;
    }

    .modal-icon {
        font-size: 3rem;
        margin-bottom: 1.5rem;
    }

    .message-text {
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--text-primary);
        line-height: 1.5;
        font-family: "Indie Flower", cursive, sans-serif; /* Handwritten feel */
    }

    .modal-decoration {
        margin-top: 2rem;
        font-size: 0.9rem;
        color: var(--accent-secondary);
        font-weight: bold;
        letter-spacing: 2px;
    }

    .close-btn {
        position: absolute;
        top: 1rem;
        right: 1.5rem;
        font-size: 2rem;
        color: var(--text-secondary);
        background: none;
        border: none;
        cursor: pointer;
        line-height: 1;
        transition: color 0.2s;
    }

    .close-btn:hover {
        color: var(--accent-primary);
    }
</style>
