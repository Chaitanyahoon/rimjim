<script>
    import { fade, fly } from "svelte/transition";
    import { rimjimData } from "../data";
    import { onMount } from "svelte";

    let currentTab = "8ball"; // 8ball, stats, challenge
    let ballText = "Shake me!";
    let isShaking = false;
    let challenge = "Click to generate a challenge";
    let isSpinning = false;

    // Stats with numeric values for animation
    let stats = [
        {
            label: "Hours Procrastinated",
            value: 9999,
            display: 0,
            suffix: "+",
            icon: "⏳",
        },
        {
            label: "Maggi Consumed",
            value: 420,
            display: 0,
            suffix: " plates",
            icon: "🍜",
        },
        {
            label: "Arguments Won",
            value: 0,
            display: 0,
            suffix: "",
            icon: "🏳️",
        },
        {
            label: "Chaos Level",
            value: 100,
            display: 0,
            suffix: "%",
            icon: "📈",
        },
    ];

    function shakeBall() {
        if (isShaking) return;
        isShaking = true;
        ballText = "Consulting the chaos...";
        setTimeout(() => {
            const answers = rimjimData.fun?.eightBall || ["Yes", "No"];
            ballText = answers[Math.floor(Math.random() * answers.length)];
            isShaking = false;
        }, 1000);
    }

    function getChallenge() {
        if (isSpinning) return;
        isSpinning = true;
        let shuffles = 0;
        const interval = setInterval(() => {
            const challenges = rimjimData.fun?.challenges || [];
            challenge =
                challenges[Math.floor(Math.random() * challenges.length)];
            shuffles++;
            if (shuffles > 10) {
                clearInterval(interval);
                isSpinning = false;
            }
        }, 100);
    }

    function animateStats() {
        stats.forEach((stat, i) => {
            const duration = 2000;
            const start = 0;
            const end = stat.value;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out quart
                const ease = 1 - Math.pow(1 - progress, 4);

                stats[i].display = Math.floor(start + (end - start) * ease);

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            requestAnimationFrame(update);
        });
    }

    onMount(() => {
        if (rimjimData.fun?.challenges) {
            challenge = rimjimData.fun.challenges[0];
        }
        // Trigger stat animation slightly after mount
        setTimeout(animateStats, 500);
    });
</script>

<div class="view-container" in:fade>
    <h2 class="section-title">🎡 The Fun Zone</h2>

    <div class="tabs">
        <button
            class="tab-btn {currentTab === '8ball' ? 'active' : ''}"
            on:click={() => (currentTab = "8ball")}>🎱 8-Ball</button
        >
        <button
            class="tab-btn {currentTab === 'stats' ? 'active' : ''}"
            on:click={() => (currentTab = "stats")}>📊 Stats</button
        >
        <button
            class="tab-btn {currentTab === 'challenge' ? 'active' : ''}"
            on:click={() => (currentTab = "challenge")}>🎯 Challenge</button
        >
    </div>

    <div class="content-area">
        {#if currentTab === "8ball"}
            <div class="toy-container" in:fade>
                <div
                    class="eight-ball {isShaking ? 'shake' : ''}"
                    on:click={shakeBall}
                >
                    <div class="window">
                        <div class="answer">{ballText}</div>
                    </div>
                </div>
                <p class="hint">Tap the ball to reveal your fate</p>
            </div>
        {:else if currentTab === "stats"}
            <div class="stats-grid" in:fade>
                {#each stats as stat, i}
                    <div class="stat-card" in:fly={{ y: 20, delay: i * 100 }}>
                        <div class="stat-icon">{stat.icon}</div>
                        <div class="stat-value">
                            {stat.display}{stat.suffix}
                        </div>
                        <div class="stat-label">{stat.label}</div>
                    </div>
                {/each}
            </div>
        {:else if currentTab === "challenge"}
            <div class="challenge-container" in:fade>
                <div class="challenge-card">
                    <h3>Daily Chaos Mission</h3>
                    <p class="challenge-text">{challenge}</p>
                    <button class="refresh-btn" on:click={getChallenge}
                        >🎲 New Challenge</button
                    >
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .view-container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 1rem 6rem 1rem;
        overflow-y: hidden;
    }

    .section-title {
        font-size: 2.5rem;
        margin-bottom: 2rem;
        color: var(--text-primary);
        text-align: center;
        font-weight: 800;
        background: linear-gradient(
            to right,
            var(--accent-primary),
            var(--accent-secondary)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .tabs {
        display: flex;
        gap: 0.5rem;
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        padding: 0.5rem;
        border-radius: 3rem;
        box-shadow: var(--shadow-soft);
        margin-bottom: 2rem;
        border: var(--glass-border);
    }

    .tab-btn {
        padding: 0.6rem 1.8rem;
        border-radius: 2rem;
        font-weight: 600;
        color: var(--text-secondary);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
    }

    .tab-btn:hover {
        color: var(--accent-primary);
        background: rgba(255, 107, 53, 0.05);
    }

    .tab-btn.active {
        background: var(--accent-primary);
        color: white;
        box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
    }

    .content-area {
        width: 100%;
        max-width: 600px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    /* 8-Ball Styles */
    .toy-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .eight-ball {
        width: 280px;
        height: 280px;
        background: radial-gradient(circle at 35% 35%, #525252, #111111);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow:
            0 30px 60px rgba(0, 0, 0, 0.3),
            inset 0 5px 10px rgba(255, 255, 255, 0.1);
        cursor: pointer;
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .eight-ball:hover {
        transform: scale(1.02);
    }

    .eight-ball:active {
        transform: scale(0.95);
    }

    .eight-ball.shake {
        animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both infinite;
    }

    .window {
        width: 140px;
        height: 140px;
        background: radial-gradient(circle at 50% 50%, #312e81, #0f172a);
        border-radius: 50%;
        border: 6px solid #262626;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 1.5rem;
        color: #93c5fd;
        font-weight: 700;
        font-size: 1.1rem;
        text-shadow: 0 0 8px rgba(147, 197, 253, 0.5);
        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
    }

    .hint {
        margin-top: 2rem;
        color: var(--text-secondary);
        font-weight: 500;
        opacity: 0.7;
        animation: pulse-soft 2s infinite;
    }

    @keyframes shake {
        10%,
        90% {
            transform: translate3d(-1px, 0, 0);
        }
        20%,
        80% {
            transform: translate3d(2px, 0, 0);
        }
        30%,
        50%,
        70% {
            transform: translate3d(-4px, 0, 0);
        }
        40%,
        60% {
            transform: translate3d(4px, 0, 0);
        }
    }

    /* Stats Grid */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        width: 100%;
    }

    .stat-card {
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        padding: 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-card);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: var(--glass-border);
        transition:
            transform 0.3s,
            box-shadow 0.3s;
    }

    .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-soft);
    }

    .stat-icon {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
    }
    .stat-value {
        font-size: 1.8rem;
        font-weight: 800;
        color: var(--accent-primary);
        letter-spacing: -1px;
    }
    .stat-label {
        font-size: 0.9rem;
        color: var(--text-secondary);
        font-weight: 600;
    }

    /* Challenge */
    .challenge-container {
        width: 100%;
    }

    .challenge-card {
        background: white;
        padding: 3rem 2rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-float);
        text-align: center;
        background-image: radial-gradient(
                circle at 100% 0%,
                rgba(255, 107, 53, 0.1) 0%,
                transparent 20%
            ),
            radial-gradient(
                circle at 0% 100%,
                rgba(249, 160, 63, 0.1) 0%,
                transparent 20%
            );
        border: 1px solid rgba(0, 0, 0, 0.02);
    }

    .challenge-text {
        font-size: 1.8rem;
        font-weight: 800;
        margin: 2rem 0;
        color: var(--text-primary);
        line-height: 1.3;
    }

    .refresh-btn {
        padding: 1rem 2.5rem;
        background: var(--accent-primary);
        color: white;
        border-radius: 3rem;
        font-weight: 700;
        font-size: 1.1rem;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4);
        transition: all 0.2s;
    }

    .refresh-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 25px rgba(255, 107, 53, 0.5);
    }

    .refresh-btn:active {
        transform: scale(0.98);
    }
</style>
