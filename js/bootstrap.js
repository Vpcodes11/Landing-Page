// Bootstraps the app after HTML partials (nav/footer) are injected.

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await (window.__includesReady || Promise.resolve());
        await (window.__modulesReady || Promise.resolve());
    } finally {
        if (typeof initializeApp === 'function') {
            initializeApp();
        }
    }
});
