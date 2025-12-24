
// --- PRODUCT DATA ---
const products = [
    {
        id: 1,
        name: 'Imperial Cincelado',
        category: 'Mates',
        price: 32500,
        image: 'images/banana_mate.png',
        badge: 'Top Choice',
        desc: 'Alpaca y Cuero Vaqueta'
    },
    {
        id: 2,
        name: 'Canarias Edición Oro',
        category: 'Yerbas',
        price: 9800,
        image: 'images/banana_yerba.png',
        desc: 'Estacionamiento 24 Meses'
    },
    {
        id: 3,
        name: 'Stanley Classic 1.4L',
        category: 'Termos',
        price: 112000,
        image: 'images/banana_thermo.png',
        desc: 'Aislamiento Térmico Pro'
    },
    {
        id: 4,
        name: 'Bombilla Pico Loro',
        category: 'Accesorios',
        price: 12500,
        image: 'images/banana_bombilla.png',
        desc: 'Alpaca Maciza'
    },
    {
        id: 5,
        name: 'Torpedo Forrado',
        category: 'Mates',
        price: 24500,
        image: 'images/banana_mate_camionero.png',
        desc: 'Cuero Crudo'
    },
    {
        id: 6,
        name: 'Mochila Cordura',
        category: 'Accesorios',
        price: 48000,
        image: 'images/banana_accessories.png',
        badge: 'Nuevo',
        desc: 'Interior Impermeable'
    },
];

const reviews = [
    { name: "Carlos Perez", avatar: "https://i.pravatar.cc/150?u=carlos", text: "Excelente calidad, el mate imperial es una joya. El envío a Buenos Aires llegó perfecto.", rating: 5, time: "hace 2 semanas" },
    { name: "Sofia Gimenez", avatar: "https://i.pravatar.cc/150?u=sofia", text: "La mejor yerba que probé en años. El estacionamiento natural se nota mucho.", rating: 5, time: "hace 1 mes" },
    { name: "Martin Rodriguez", avatar: "https://i.pravatar.cc/150?u=martin", text: "Atención impecable por WhatsApp. Me asesoraron con el curado y el mate quedó increíble.", rating: 5, time: "hace 3 días" },
    { name: "Lucia Fernandez", avatar: "https://i.pravatar.cc/150?u=lucia", text: "Compré un termo Stanley y es original 100%. Rapidez y confianza. Mi tienda favorita.", rating: 5, time: "hace 2 meses" },
    { name: "Gabriel Iturre", avatar: "https://i.pravatar.cc/150?u=gabriel", text: "Diseños únicos. Se nota el trabajo artesanal en cada detalle. Vale cada peso.", rating: 5, time: "hace 1 semana" }
];

function init() {
    lucide.createIcons();
    renderProducts('Todos');
    renderReviews();
    initAnimations();
    init3DEffects();
    initCustomCursor();
    initMagneticButtons();
    setTimeout(() => ScrollTrigger.refresh(), 500);
}

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    window.addEventListener('mousemove', e => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "none" });
    });
    document.querySelectorAll('button, a, .product-card, .cat-pill, .bento-item, .review-card, .step-card-3d').forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 1.5, duration: 0.3 }));
        el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, duration: 0.3 }));
    });
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Text & Element reveals
    document.querySelectorAll('.reveal').forEach((el, i) => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none" },
            opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: i * 0.05
        });
    });

    // ONE BY ONE DROP-IN (The "Interactivos que se colocan")
    document.querySelectorAll('.bento-item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" },
            opacity: 1,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 1.5,
            ease: "expo.out", // Professional settlement
            delay: (i % 3) * 0.15
        });
    });

    // Hero Floating
    gsap.to(".card-3d", { y: -15, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Parallax
    gsap.to("#home h2", {
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 1.5 },
        x: 350, ease: "none"
    });
}

function init3DEffects() {
    document.querySelectorAll('.card-3d, .product-card, .bento-item, .step-card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            gsap.to(card, { rotateX, rotateY, duration: 0.5, ease: "power2.out", transformPerspective: 1000 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 1, ease: "power3.out" });
        });
    });
}

function renderReviews() {
    const container = document.getElementById('reviews-container');
    if (!container) return;
    const allReviews = [...reviews, ...reviews];
    container.innerHTML = allReviews.map(r => `
        <div class="review-card">
            <div class="flex items-start justify-between mb-2">
                <div class="flex items-center gap-4">
                    <img src="${r.avatar}" class="w-14 h-14 rounded-full object-cover border-2 border-brand-50 shadow-md">
                    <div class="flex flex-col">
                        <h4 class="text-base font-bold text-brand-900">${r.name}</h4>
                        <p class="text-[11px] text-gray-400">${r.time}</p>
                    </div>
                </div>
                <div class="bg-gray-50 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></svg>
                </div>
            </div>
            <div class="flex text-yellow-400 mb-3">
                ${Array(r.rating).fill('<i data-lucide="star" class="fill-current w-4 h-4"></i>').join('')}
            </div>
            <p class="text-[14px] text-brand-800 leading-relaxed font-medium italic">"${r.text}"</p>
            <div class="mt-auto flex items-center gap-2 border-t border-gray-100 pt-4">
                <div class="flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full shadow-sm">
                    <i data-lucide="check" class="w-3 h-3 text-white"></i>
                </div>
                <span class="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest">Reseña Verificada</span>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderProducts(filter) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    const filtered = filter === 'Todos' ? products : products.filter(p => p.category === filter);
    grid.innerHTML = filtered.map(p => `
        <div class="product-card group relative bg-white rounded-[2.5rem] p-4 pb-8 transition-all hover:shadow-2xl opacity-0 translate-y-20 shadow-sm border border-brand-100/50" style="transform-style: preserve-3d;">
            ${p.badge ? `<span class="absolute top-8 left-8 z-20 bg-accent text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest ">${p.badge}</span>` : ''}
            <div class="h-64 md:h-80 bg-brand-100/50 rounded-[2rem] mb-6 overflow-hidden relative flex items-center justify-center" style="transform: translateZ(30px);">
                <img src="${p.image}" class="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700">
            </div>
            <div class="px-4 space-y-2" style="transform: translateZ(50px);">
                <p class="text-[10px] text-accent font-bold uppercase tracking-widest leading-none">${p.category}</p>
                <h3 class="text-xl font-serif text-brand-900 leading-tight">${p.name}</h3>
                <p class="text-[10px] text-brand-400 font-medium">${p.desc}</p>
                <div class="pt-4 flex justify-between items-center border-t border-brand-100/50 mt-4">
                    <span class="text-xl font-bold text-brand-900">$${p.price.toLocaleString()}</span>
                    <a href="https://wa.me/5493880000000?text=Hola! Quiero consultar por el producto: ${p.name}" target="_blank" class="text-[10px] font-bold uppercase tracking-widest text-brand-400 hover:text-accent transition-colors">Consultar</a>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
    init3DEffects();
    gsap.to("#product-grid .product-card", { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power2.out" });
}

function initMagneticButtons() {
    document.querySelectorAll('.btn-premium, .cat-pill').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            gsap.to(btn, { x: (e.clientX - rect.left - rect.width / 2) * 0.3, y: (e.clientY - rect.top - rect.height / 2) * 0.3, duration: 0.3 });
        });
        btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "power3.out" }));
    });
}

function filterProducts(category, btn) {
    document.querySelectorAll('.cat-pill').forEach(b => b.classList.replace('bg-brand-900', 'border-brand-200'));
    btn.classList.replace('border-brand-200', 'bg-brand-900');
    renderProducts(category);
}

function toggleMobileMenu() { document.getElementById('mobile-menu').classList.toggle('translate-x-full'); }

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', () => ScrollTrigger.refresh());
