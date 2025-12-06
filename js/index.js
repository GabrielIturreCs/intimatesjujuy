
// --- DATA ---
const products = [
    { id: 1, name: 'Imperial Premium', category: 'Mates', price: 28500, image: 'images/banana_mate.png', badge: 'Best Seller' },
    { id: 2, name: 'Canarias 1kg', category: 'Yerbas', price: 8500, image: 'images/banana_yerba.png' },
    { id: 3, name: 'Stanley 1.4L', category: 'Termos', price: 105000, image: 'images/banana_thermo.png' },
    { id: 4, name: 'Bombilla Alpaca', category: 'Accesorios', price: 9200, image: 'images/banana_bombilla.png' },
    { id: 5, name: 'Camionero Algarrobo', category: 'Mates', price: 19500, image: 'images/banana_mate_camionero.png' },
    { id: 6, name: 'Mochila Matera', category: 'Accesorios', price: 45000, image: 'images/banana_accessories.png', badge: 'Nuevo' },
];

let cartCount = 0;

// --- LOGIC ---

function init() {
    lucide.createIcons();
    renderProducts('Todos');

    // Init 3D Tilt
    initTilt();

    // Init Scroll Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

function initTilt() {
    const cards = document.querySelectorAll('.card-nature');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

function showPage(pageId, btnElement = null) {
    // 1. Update Nav Buttons
    // Reset all
    document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.remove('bg-white', 'shadow-sm', 'text-nature-800');
        b.classList.add('text-nature-600');
    });

    // Highlight logic
    if (btnElement) {
        // Direct click
        btnElement.classList.remove('text-nature-600');
        btnElement.classList.add('bg-white', 'shadow-sm', 'text-nature-800');
    } else {
        // Programmatic click or scroll spy (future)
        const navBtns = document.querySelectorAll('.nav-btn');
        let activeIndex = -1;
        if (pageId === 'home') activeIndex = 0;
        else if (pageId === 'servicios') activeIndex = 1;
        else if (pageId === 'catalogo') activeIndex = 2;
        else if (pageId === 'nosotros') activeIndex = 3;

        if (activeIndex > -1 && navBtns[activeIndex]) {
            navBtns[activeIndex].classList.remove('text-nature-600');
            navBtns[activeIndex].classList.add('bg-white', 'shadow-sm', 'text-nature-800');
        }
    }

    // 2. Scroll to Section
    let targetId = pageId;
    // Map abstract IDs if needed
    if (pageId === 'home') targetId = 'home'; // Top

    // For Home, we scroll to top of body or top of container
    if (pageId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('translate-y-full');
}

function filterAndShow(category) {
    showPage('catalogo');

    // Small delay to allow page transition
    setTimeout(() => {
        const btns = document.querySelectorAll('.cat-btn');
        btns.forEach(b => {
            if (b.textContent === category) b.click();
        });
    }, 100);
}

function filterProducts(category, btn) {
    // Update buttons
    document.querySelectorAll('.cat-btn').forEach(b => {
        b.className = 'cat-btn bg-white text-nature-600 px-6 py-2 rounded-full font-bold hover:bg-nature-100 transition-all cursor-pointer';
    });
    btn.className = 'cat-btn active bg-nature-800 text-white px-6 py-2 rounded-full font-bold transition-all shadow-md cursor-pointer';

    renderProducts(category);
}

function renderProducts(filter) {
    const grid = document.getElementById('product-grid');
    const filtered = filter === 'Todos' ? products : products.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(p => `
                <div class="card-nature bg-white p-4 pb-6 flex flex-col relative group transition-all duration-200" style="transform-style: preserve-3d;">
                    ${p.badge ? `<span class="absolute top-6 left-6 z-20 bg-earth-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm transform translate-z-10">${p.badge}</span>` : ''}
                    
                    <div class="h-64 bg-nature-100 rounded-[1.5rem] mb-4 overflow-hidden relative" style="transform: translateZ(20px);">
                        <img src="${p.image}" class="w-full h-full object-cover transition-transform duration-700" alt="${p.name}">
                        <button onclick="addToCart()" class="absolute bottom-4 right-4 bg-white text-nature-900 w-10 h-10 rounded-full flex items-center justify-center shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform duration-300 hover:bg-nature-800 hover:text-white z-30">
                            <i data-lucide="plus" class="w-5 h-5"></i>
                        </button>
                    </div>
                    
                    <div class="px-2" style="transform: translateZ(30px);">
                        <p class="text-xs text-earth-600 font-bold uppercase mb-1">${p.category}</p>
                        <h3 class="text-lg font-bold text-nature-900 leading-tight">${p.name}</h3>
                        <p class="text-nature-600 font-bold mt-2">$${p.price.toLocaleString()}</p>
                    </div>
                </div>
            `).join('');

    lucide.createIcons();
    initTilt(); // Apply tilt to new elements
}

function addToCart() {
    cartCount++;
    const pill = document.getElementById('cart-pill');
    pill.style.transform = 'scale(1)';
}

// Init
document.addEventListener('DOMContentLoaded', init);
