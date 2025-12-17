<script>
    import { onMount, onDestroy } from "svelte";
    import { scale } from "svelte/transition";
    import { sfx } from "../sounds";

    // Stats (0-100)
    let hunger = 80;
    let energy = 80;
    let love = 50;

    // State
    let mood = "idle"; // idle, happy, angry, tired, sick, eating, sleeping
    let isDead = false;
    let decayInterval;
    let statusMsg = "";

    const moodMap = {
        idle: "0% 0%",
        angry: "100% 0%",
        tired: "0% 100%",
        happy: "100% 100%",
        sick: "100% 0%", // Reusing angry for sick but will filter color
        eating: "100% 100%",
        sleeping: "0% 100%",
    };

    // --- Core Logic ---

    function startLife() {
        decayInterval = setInterval(() => {
            if (isDead) return;

            // Decay
            hunger = Math.max(0, hunger - 2);
            energy = Math.max(0, energy - 1);
            love = Math.max(0, love - 2);

            checkState();
        }, 2000); // Ticks every 2s
    }

    function checkState() {
        if (hunger === 0 || love === 0) {
            // High risk!
        }

        // Auto-Mood updates based on stats
        if (hunger < 20) {
            mood = "sick";
            statusMsg = "Feed me!!";
        } else if (energy < 20) {
            mood = "tired";
            statusMsg = "So sleepy...";
        } else if (love < 30) {
            mood = "angry";
            statusMsg = "Bored...";
        } else if (mood !== "eating" && mood !== "sleeping") {
            mood = "idle";
            statusMsg = "";
        }
    }

    // --- Interactions ---

    function feed() {
        if (mood === "sleeping") return; // Allow feeding even if sick/angry

        sfx.playPop();
        mood = "eating";
        statusMsg = "Yummy!";
        hunger = Math.min(100, hunger + 30);

        setTimeout(() => {
            checkState(); // Re-check state to clear 'sick' if hunger is high enough
            if (hunger >= 20 && mood === "eating") {
                mood = "happy";
                setTimeout(() => {
                    mood = "idle";
                    statusMsg = "";
                }, 1000);
            }
        }, 1500);
    }

    function nap() {
        if (energy > 90) {
            statusMsg = "Not tired!";
            return;
        }
        sfx.playWhoosh();
        mood = "sleeping";
        statusMsg = "Zzz...";

        // Rapid regen
        const napInterval = setInterval(() => {
            energy = Math.min(100, energy + 10);
            if (energy >= 100) {
                clearInterval(napInterval);
                mood = "idle";
                statusMsg = "Energized! ⚡";
                setTimeout(() => (statusMsg = ""), 2000);
            }
        }, 500);
    }

    function play() {
        if (mood === "sleeping" || energy < 20) {
            statusMsg = "Too tired...";
            return;
        }
        sfx.playPop();
        mood = "happy";
        statusMsg = "Fun!!";
        love = Math.min(100, love + 20);
        energy = Math.max(0, energy - 10); // Playing costs energy

        setTimeout(() => {
            mood = "idle";
            checkState();
        }, 1500);
    }

    onMount(startLife);
    onDestroy(() => clearInterval(decayInterval));
</script>

<div class="console-wrapper">
    <div class="brand">RIMJHIM BOY</div>

    <!-- LCD Screen -->
    <div class="screen-frame">
        <div class="lcd">
            <!-- Room Background -->
            <div class="room-bg"></div>

            <div class="pixel-grid-overlay"></div>

            <!-- Status Message -->
            {#if statusMsg}
                <div class="status-bubble" transition:scale>{statusMsg}</div>
            {/if}

            <!-- The Sprite -->
            <div
                class="sprite {mood}"
                style="background-position: {moodMap[mood] || '0% 0%'}"
            ></div>
        </div>
    </div>

    <!-- Stats Dashboard -->
    <div class="stats-panel">
        <div class="stat-col">
            <span class="icon">🍗</span>
            <div class="v-bar">
                <div class="fill hunger" style="width: {hunger}%"></div>
            </div>
        </div>
        <div class="stat-col">
            <span class="icon">⚡</span>
            <div class="v-bar">
                <div class="fill energy" style="width: {energy}%"></div>
            </div>
        </div>
        <div class="stat-col">
            <span class="icon">❤️</span>
            <div class="v-bar">
                <div class="fill love" style="width: {love}%"></div>
            </div>
        </div>
    </div>

    <!-- Buttons -->
    <div class="controls">
        <button class="btn action-feed" on:click={feed}>
            <span class="btn-icon">🍔</span>
        </button>
        <div class="d-pad"></div>
        <!-- Decorative D-Pad -->
        <button class="btn action-nap" on:click={nap}>
            <span class="btn-icon">🌙</span>
        </button>
        <button class="btn action-play" on:click={play}>
            <span class="btn-icon">🎾</span>
        </button>
    </div>
</div>

<style>
    .console-wrapper {
        background: #facc15; /* Tropical Yellow Body */
        background-image: radial-gradient(
            rgba(255, 255, 255, 0.2) 2px,
            transparent 2px
        ); /* Subtle grip texture */
        background-size: 10px 10px;
        padding: 2.5rem 2rem;
        border-radius: 30px 30px 50% 50% / 30px 30px 60px 60px; /* Gameboy Shape */
        box-shadow:
            0 25px 0 #d97706,
            /* 3D Depth */ 0 35px 40px rgba(0, 0, 0, 0.2),
            inset 0 5px 10px rgba(255, 255, 255, 0.5);
        border: 4px solid #b45309;
        width: 320px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.2rem;
        position: relative;
        transform: rotate(-2deg);
        transition: transform 0.2s;
        margin-bottom: 2rem;
    }
    .console-wrapper:hover {
        transform: rotate(0deg) scale(1.02);
    }

    .brand {
        font-family: "Courier New", sans-serif;
        font-weight: 900;
        color: #b45309;
        letter-spacing: 2px;
        font-size: 1.2rem;
        margin-bottom: -0.5rem;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
    }

    .screen-frame {
        background: #52525b;
        padding: 20px 20px 35px 20px;
        border-radius: 15px 15px 40px 15px;
        width: 100%;
        box-shadow:
            inset 0 2px 5px rgba(0, 0, 0, 0.5),
            0 5px 10px rgba(0, 0, 0, 0.2);
    }

    .lcd {
        background: #cffafe;
        height: 160px;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        border: 2px solid #22d3ee;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 20px;
        box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 0.1);
    }

    .room-bg {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30%;
        background: #a5f3fc;
        border-top: 2px solid #22d3ee;
    }

    .pixel-grid-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(#22d3ee 1px, transparent 1px),
            linear-gradient(90deg, #22d3ee 1px, transparent 1px);
        background-size: 4px 4px;
        opacity: 0.2;
        pointer-events: none;
        z-index: 5;
    }

    .sprite {
        width: 100px;
        height: 100px;
        background-image: url("/pixel_pet_sprites.png");
        background-size: 200% 200%;
        image-rendering: pixelated;
        z-index: 10;
        transition: filter 0.3s;
    }

    .sprite.idle {
        animation: bounce 2s infinite;
    }
    .sprite.happy {
        animation: jump 0.5s infinite;
    }
    .sprite.eating {
        transform: scale(1.1);
    }
    .sprite.tired {
        filter: grayscale(1);
        opacity: 0.8;
    }
    .sprite.sick {
        filter: hue-rotate(90deg) sepia(0.5);
        animation: shake 0.5s infinite;
    }
    .sprite.sleeping {
        filter: brightness(0.8);
        transform: translateY(10px);
    }

    @keyframes bounce {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-5px);
        }
    }
    @keyframes jump {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-20px);
        }
    }
    @keyframes shake {
        0%,
        100% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-3px);
        }
        75% {
            transform: translateX(3px);
        }
    }

    .status-bubble {
        position: absolute;
        top: 20px;
        right: 10px;
        background: white;
        padding: 5px 10px;
        border-radius: 12px;
        font-family: "Courier New", monospace;
        font-weight: bold;
        font-size: 0.8rem;
        border: 2px solid #333;
        z-index: 20;
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
    }
    .status-bubble::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 10px;
        border-width: 8px 8px 0;
        border-style: solid;
        border-color: #333 transparent;
    }

    /* Stats Panel */
    .stats-panel {
        position: relative;
        width: 100%;
        padding: 0 1rem;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
    }

    .stat-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        flex: 1;
    }

    .icon {
        font-size: 1.2rem;
        filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.5));
    }

    .v-bar {
        width: 100%;
        height: 8px;
        background: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        overflow: hidden;
    }

    .fill {
        height: 100%;
        width: 0%;
        transition: width 0.5s;
    }
    .fill.hunger {
        background: #f97316;
    }
    .fill.energy {
        background: #3b82f6;
    }
    .fill.love {
        background: #ec4899;
    }

    /* Controls */
    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 1.5rem;
        margin-top: 0.5rem;
    }

    .btn {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        box-shadow:
            0 5px 0 rgba(0, 0, 0, 0.3),
            inset 0 2px 5px rgba(255, 255, 255, 0.4);
        transition:
            transform 0.1s,
            box-shadow 0.1s;
    }
    .btn:active {
        transform: translateY(5px);
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
    }

    .action-feed {
        background: #ef4444;
        color: white;
        box-shadow: 0 5px 0 #991b1b;
    }
    .action-nap {
        background: #3b82f6;
        color: white;
        box-shadow: 0 5px 0 #1e40af;
    }
    .action-play {
        background: #22c55e;
        color: white;
        box-shadow: 0 5px 0 #15803d;
    }

    /* Realistic D-Pad */
    .d-pad {
        position: relative;
        width: 90px;
        height: 90px;
    }
    .d-pad::before {
        /* Horizontal */
        content: "";
        position: absolute;
        top: 30px;
        left: 0;
        width: 90px;
        height: 30px;
        background: #333;
        border-radius: 5px;
        box-shadow:
            0 3px 0 #111,
            inset 0 2px 5px rgba(255, 255, 255, 0.2);
    }
    .d-pad::after {
        /* Vertical */
        content: "";
        position: absolute;
        top: 0;
        left: 30px;
        width: 30px;
        height: 90px;
        background: #333;
        border-radius: 5px;
        box-shadow:
            0 3px 0 #111,
            inset 0 2px 5px rgba(255, 255, 255, 0.2);
    }
    .d-pad-center {
        position: absolute;
        top: 35px;
        left: 35px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #222 30%, #333 100%);
        border-radius: 50%;
        z-index: 5;
    }
</style>
