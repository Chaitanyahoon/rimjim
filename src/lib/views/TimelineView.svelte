<script>
    import { fade, fly } from "svelte/transition";
    import { rimjimData } from "../data";
</script>

<div class="view-container" in:fade>
    <h2 class="title" in:fly={{ y: -20 }}>🕰️ Timeline of Chaos</h2>
    <div class="timeline-container">
        <div class="timeline-line"></div>
        {#each rimjimData.timeline as event, i}
            <div
                class="timeline-item"
                in:fly={{
                    x: i % 2 === 0 ? -50 : 50,
                    duration: 800,
                    delay: i * 200,
                }}
            >
                <div class="dot"></div>
                <div class="content">
                    <span class="date">{event.date}</span>
                    <h3>{event.title}</h3>
                    <p>{event.desc}</p>
                </div>
            </div>
        {/each}
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
        overflow-y: auto;
    }

    .title {
        font-size: 2rem;
        margin-bottom: 2rem;
        color: var(--text-primary);
        text-align: center;
    }

    .timeline-container {
        position: relative;
        max-width: 600px;
        width: 100%;
        padding: 0 0 2rem 2rem;
    }

    .timeline-line {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: var(--accent-secondary);
        border-radius: 2px;
    }

    .timeline-item {
        position: relative;
        margin-bottom: 2.5rem;
        padding-left: 2rem;
    }

    .dot {
        position: absolute;
        left: -2.6rem; /* Adjust based on padding */
        top: 5px;
        width: 16px;
        height: 16px;
        background: var(--accent-primary);
        border: 4px solid var(--bg-card);
        border-radius: 50%;
        box-shadow: 0 0 0 2px var(--accent-primary);
        z-index: 1;
    }

    .content {
        background: white;
        padding: 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-card);
        border-left: 4px solid var(--accent-primary);
    }

    .date {
        display: inline-block;
        background: var(--bg-dark);
        padding: 0.2rem 0.6rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
    }

    h3 {
        font-size: 1.2rem;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }

    p {
        color: var(--text-secondary);
        font-size: 0.95rem;
    }
</style>
