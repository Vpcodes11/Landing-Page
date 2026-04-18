async function loadSiteData() {
    try {
        const res = await fetch('data/site.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.warn('Failed to load site data:', err);
        return null;
    }
}

function createPropertyCard(item) {
    const card = document.createElement('div');
    card.className = 'property-masterpiece';
    card.setAttribute('data-aos', 'fade-up');
    if (typeof item.aosDelay === 'number') {
        card.setAttribute('data-aos-delay', String(item.aosDelay));
    }

    const badgeClass = item.badgeClass ? `property-badge ${item.badgeClass}` : 'property-badge';

    const featuresHtml = (item.features || [])
        .map(f => `
            <div class="feature-item">
                <i class="${f.icon}"></i>
                <span>${f.text}</span>
            </div>
        `)
        .join('');

    card.innerHTML = `
        <div class="property-visual">
            <div class="property-image">
                <img src="${item.image}" alt="${item.imageAlt || item.title}" loading="lazy">
                <div class="image-overlay"></div>
            </div>
            <div class="${badgeClass}">${item.badgeText || ''}</div>
            <div class="property-hover-content">
                <button class="explore-btn">EXPLORE DETAILS</button>
            </div>
        </div>
        <div class="property-details">
            <div class="property-header">
                <h3>${item.title}</h3>
                <div class="property-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
            </div>
            <p class="property-description">
                ${item.description || ''}
            </p>
            <div class="property-features">
                ${featuresHtml}
            </div>
            <div class="property-pricing">
                <div class="price-main">${item.priceMain || ''}</div>
                <div class="price-note">${item.priceNote || ''}</div>
            </div>
        </div>
    `;

    return card;
}

function renderProperties(data) {
    const container = document.querySelector('[data-module="properties"]');
    if (!container) return;
    if (!data?.properties?.length) return;

    container.innerHTML = '';
    data.properties.forEach(item => container.appendChild(createPropertyCard(item)));
}


function createGalleryFilters(filters) {
    const bar = document.createElement('div');
    bar.className = 'gallery-filters';

    (filters || []).forEach((f) => {
        const btn = document.createElement('button');
        btn.className = 'filter-pill' + (f.key === 'all' ? ' active' : '');
        btn.type = 'button';
        btn.setAttribute('data-filter', f.key);
        btn.innerHTML = `${f.icon ? `<i class="${f.icon}"></i>` : ''}${f.label}`;
        bar.appendChild(btn);
    });

    return bar;
}

function createGalleryPiece(item) {
    const el = document.createElement('div');
    el.className = 'gallery-piece';
    el.setAttribute('data-category', item.category || 'all');
    el.innerHTML = `
        <div class="piece-image">
            <img src="${item.image}" alt="${item.imageAlt || item.title}" loading="lazy">
        </div>
        <div class="piece-overlay">
            <div class="piece-info">
                <div class="piece-category">${(item.category || '').toUpperCase()}</div>
                <h4>${item.title || ''}</h4>
                <p>${item.subtitle || ''}</p>
            </div>
        </div>
    `;
    return el;
}

function renderGallery(data) {
    const container = document.querySelector('[data-module="gallery"]');
    if (!container) return;
    if (!data?.gallery?.items?.length) return;

    container.innerHTML = '';

    const filters = data.gallery.filters?.length
        ? data.gallery.filters
        : [{ key: 'all', label: 'All' }];

    container.appendChild(createGalleryFilters(filters));

    const grid = document.createElement('div');
    grid.className = 'gallery-grid';
    data.gallery.items.forEach(item => grid.appendChild(createGalleryPiece(item)));
    container.appendChild(grid);
}

window.__modulesReady = (async () => {
    const data = await loadSiteData();
    renderProperties(data);
    renderGallery(data);
})();
