export function inview(node: HTMLElement, params: { threshold?: number, unobserveOnEnter?: boolean } = {}) {
    let observer: IntersectionObserver;
    const threshold = params.threshold || 0.2;
    const unobserveOnEnter = params.unobserveOnEnter !== false;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                node.dispatchEvent(new CustomEvent('enter'));
                if (unobserveOnEnter) {
                    observer.unobserve(node);
                }
            } else {
                node.dispatchEvent(new CustomEvent('leave'));
            }
        });
    };

    observer = new IntersectionObserver(handleIntersect, { threshold });
    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
}
