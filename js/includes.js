// Simple HTML includes for static hosting (partials).
// Usage: <div data-include="partials/nav.html"></div>

async function loadIncludes() {
    const includeElements = Array.from(document.querySelectorAll('[data-include]'));
    if (includeElements.length === 0) return;

    await Promise.all(includeElements.map(async (el) => {
        const url = (el.getAttribute('data-include') || '').trim();
        if (!url) return;

        try {
            const res = await fetch(url, { cache: 'no-cache' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const html = await res.text();
            el.innerHTML = html;
            el.removeAttribute('data-include');
        } catch (err) {
            // Keep the page usable even if partials fail to load.
            console.warn('Include failed:', url, err);
        }
    }));
}

window.__includesReady = loadIncludes();

