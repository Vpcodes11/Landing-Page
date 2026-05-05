
// Simple HTML includes for static hosting (partials) with path correction.
// Usage: <div data-include="partials/nav.html"></div>
// or in subfolders: <div data-include="../partials/nav.html"></div>

async function loadIncludes() {
    const includeElements = Array.from(document.querySelectorAll('[data-include]'));
    if (includeElements.length === 0) return;

    await Promise.all(includeElements.map(async (el) => {
        const url = (el.getAttribute('data-include') || '').trim();
        if (!url) return;

        try {
            const res = await fetch(url, { cache: 'no-cache' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            let html = await res.text();

            // Path correction for subfolders
            // If the include path starts with '../', we need to adjust relative paths in the content
            if (url.startsWith('../')) {
                const prefix = url.substring(0, url.lastIndexOf('/') + 1)
                    .replace('partials/', '')
                    .replace('components/', '');
                
                // Adjust src, href, and data-src that start with './'
                html = html.replace(/(src|href|data-src)=".\//g, `$1="${prefix}`);
            }

            el.innerHTML = html;
            el.removeAttribute('data-include');
            
            // Re-trigger AOS if it exists
            if (window.AOS) {
                window.AOS.refresh();
            }
        } catch (err) {
            console.warn('Include failed:', url, err);
        }
    }));
}

window.__includesReady = loadIncludes();
