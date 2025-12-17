<script>
    import { fade, fly, scale } from "svelte/transition";
    import { rimjimData } from "../data";

    let redeemed = new Set();

    function redeem(id) {
        if (redeemed.has(id)) return;
        redeemed.add(id);
        redeemed = redeemed; // trigger update
        // Play stamp sound if available
    }
</script>

<div class="view-container" in:fade>
    <h2 class="title">🎟️ Friendship Coupons</h2>
    <p class="subtitle">Valid forever. Non-transferable. Use wisely.</p>

    <div class="coupons-grid">
        {#each rimjimData.coupons as coupon, i}
            <div
                class="coupon-card {redeemed.has(coupon.id) ? 'redeemed' : ''}"
                in:fly={{ y: 20, delay: i * 100 }}
                on:click={() => redeem(coupon.id)}
            >
                <div class="coupon-content">
                    <div class="icon">{coupon.icon}</div>
                    <h3>{coupon.title}</h3>
                    <p>{coupon.desc}</p>
                </div>
                {#if redeemed.has(coupon.id)}
                    <div class="stamp" in:scale>REDEEMED</div>
                {/if}
                <div class="rip-lines"></div>
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
        overflow-y: auto; /* Allow scrolling for tickets if needed */
        overflow-x: hidden;
    }

    .title {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }

    .subtitle {
        font-size: 1rem;
        color: var(--text-secondary);
        margin-bottom: 2rem;
        font-style: italic;
    }

    .coupons-grid {
        display: grid;
        gap: 1.5rem;
        width: 100%;
        max-width: 500px;
        padding-bottom: 2rem;
    }

    .coupon-card {
        background: white;
        border-radius: var(--radius-md);
        position: relative;
        display: flex;
        box-shadow: var(--shadow-card);
        transition: transform 0.2s;
        cursor: pointer;
        overflow: hidden;
        border: 2px dashed rgba(0, 0, 0, 0.1);
    }

    .coupon-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-soft);
        border-color: var(--accent-primary);
    }

    .coupon-content {
        padding: 1.5rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .icon {
        font-size: 2rem;
    }

    h3 {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--accent-primary);
    }

    p {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    .stamp {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-15deg);
        border: 3px solid #ef4444;
        color: #ef4444;
        font-weight: 900;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        opacity: 0.8;
        font-size: 1.5rem;
        letter-spacing: 0.1em;
        pointer-events: none;
    }

    .redeemed {
        opacity: 0.7;
        filter: grayscale(0.5);
    }

    /* Rip lines decoration */
    .rip-lines {
        width: 0px;
        border-right: 2px dashed rgba(0, 0, 0, 0.1);
        position: absolute;
        right: 3rem;
        top: 0;
        bottom: 0;
    }
</style>
