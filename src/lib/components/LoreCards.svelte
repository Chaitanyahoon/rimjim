<script>
    import { rimjimData } from "../data";

    const traits = rimjimData.about.traits || [];
</script>

<section class="lore-section">
    <h2 class="section-title">🃏 Canon Lore</h2>

    <div class="cards-grid">
        {#each traits as trait, i}
            <div class="card-container">
                <div class="card">
                    <div class="card-front">
                        <div class="icon-circle">{trait.icon}</div>
                        <div class="trait-id">LVL. {99 - i * 10}</div>
                    </div>
                    <div class="card-back">
                        <p>{trait.text}</p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
    .lore-section {
        width: 100%;
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .section-title {
        font-size: 2rem;
        margin-bottom: 2rem;
        color: var(--text-primary);
        font-weight: 800;
        text-align: center;
    }

    .cards-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
        width: 100%;
        max-width: 1000px;
    }

    .card-container {
        width: 160px;
        height: 220px;
        perspective: 1000px;
    }

    .card {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
    }

    .card-container:hover .card {
        transform: rotateY(180deg);
    }

    .card-front,
    .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        box-shadow: var(--shadow-card);
        border: 2px solid rgba(255, 255, 255, 0.5);
    }

    .card-front {
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.7),
            rgba(255, 255, 255, 0.3)
        );
        backdrop-filter: blur(10px);
    }

    .card-back {
        background: linear-gradient(
            135deg,
            var(--accent-primary),
            var(--accent-secondary)
        );
        color: white;
        transform: rotateY(180deg);
        text-align: center;
    }

    .icon-circle {
        font-size: 3rem;
        background: rgba(255, 255, 255, 0.5);
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        box-shadow:
            inset 0 2px 5px rgba(255, 255, 255, 0.5),
            0 5px 10px rgba(0, 0, 0, 0.1);
    }

    .trait-id {
        font-weight: 800;
        color: var(--text-secondary);
        letter-spacing: 1px;
        font-size: 0.9rem;
    }

    .card-back p {
        font-weight: 600;
        line-height: 1.4;
        font-size: 0.95rem;
    }
</style>
