// Bootstraps the app after HTML partials (nav/footer) are injected.

async function startBootstrap() {
    try {
        await (window.__includesReady || Promise.resolve());
        await (window.__modulesReady || Promise.resolve());
    } finally {
        if (typeof initializeApp === 'function') {
            initializeApp();
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startBootstrap);
} else {
    startBootstrap();
}
