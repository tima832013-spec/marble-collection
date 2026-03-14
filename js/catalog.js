/* =============================================
   CATALOG & PRODUCT PAGE JS
   ============================================= */

// Product database
const PRODUCTS = [
    { id: 1, name: 'Marble Classic', desc: 'Кашпо с эффектом белого мрамора', fullDesc: 'Элегантное кашпо с реалистичным эффектом белого мрамора. Лёгкое, прочное, устойчивое к влаге. Идеально для интерьеров в стиле минимализм.', price: 4500, category: 'exclusive bestsellers', img: 'https://static.tildacdn.com/tild3839-3464-4736-b039-343136306665/23-10-20215858_7.jpg', badge: 'Хит' },
    { id: 2, name: 'Nero', desc: 'Тёмное кашпо с золотыми прожилками', fullDesc: 'Роскошное тёмное кашпо с эффектом чёрного мрамора и золотыми прожилками. Смотрится дорого и стильно.', price: 5200, category: 'exclusive bestsellers', img: 'https://static.tildacdn.com/tild3065-3234-4261-a630-366238353736/23-10-20215858_8.jpg', badge: 'Хит' },
    { id: 3, name: 'Bianco Set', desc: 'Комплект кашпо с подставкой', fullDesc: 'Набор из кашпо и подставки из натурального дерева. Гармоничное сочетание камня и дерева.', price: 7800, category: 'sets indoor', img: 'https://static.tildacdn.com/tild3138-3734-4764-a266-333436653661/23-10-20215882_10.jpg' },
    { id: 4, name: 'Verde', desc: 'Кашпо для уличных растений', fullDesc: 'Прочное кашпо для террас и садов. Устойчиво к перепадам температур, дождю и ультрафиолету.', price: 6300, category: 'outdoor bestsellers', img: 'https://static.tildacdn.com/tild3739-3662-4331-b933-666434383364/23-10-20215868_4.jpg' },
    { id: 5, name: 'Grigio', desc: 'Серое кашпо для интерьера', fullDesc: 'Универсальное серое кашпо, которое впишется в любой интерьер. Нейтральный цвет подчёркивает красоту растений.', price: 3900, category: 'indoor bestsellers', img: 'https://static.tildacdn.com/tild3530-6334-4138-a330-303737376139/23-10-20215658_2.jpg' },
    { id: 6, name: 'Rosso', desc: 'Терракотовое кашпо ручной работы', fullDesc: 'Кашпо тёплого терракотового оттенка. Каждое изделие уникально благодаря ручной росписи.', price: 4100, category: 'exclusive indoor', img: 'https://static.tildacdn.com/tild6666-3266-4164-b531-336464333361/ChatGPT_Image_Mar_13.png', badge: 'Новинка', badgeClass: 'catalog-card__badge--new' },
    { id: 7, name: 'Duo Marble', desc: 'Набор из двух кашпо с подставкой', fullDesc: 'Выгодный набор из двух кашпо разного размера с общей деревянной подставкой.', price: 8500, category: 'sets indoor', img: 'https://static.tildacdn.com/tild3261-3065-4865-a433-346536343331/ChatGPT_Image_Mar_13.png' },
    { id: 8, name: 'Grande Outdoor', desc: 'Большое кашпо для террасы', fullDesc: 'Большое кашпо для крупных растений. Идеально для террас, балконов и входных зон.', price: 9200, category: 'outdoor', img: 'https://static.tildacdn.com/tild3362-3565-4265-a465-353361343031/Frame_40.png' },
    { id: 9, name: 'Подставка Wood', desc: 'Деревянная подставка под кашпо', fullDesc: 'Подставка из натурального дерева. Подходит для кашпо диаметром от 15 до 25 см.', price: 1200, category: 'accessories', img: 'https://static.tildacdn.com/tild6337-6135-4262-b234-383131343164/Frame_437.png' },
];

// --- CATALOG PAGE ---
const productGrid = document.getElementById('productGrid');
const filterTabs = document.querySelectorAll('.filter-tab');
const sortSelect = document.getElementById('sortSelect');
const catalogEmpty = document.getElementById('catalogEmpty');
const catalogTitle = document.getElementById('catalogTitle');
const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');

if (productGrid) {
    // Check URL params for category
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');

    if (catParam) {
        filterTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.filter === catParam);
        });
        filterProducts(catParam);
        updateTitle(catParam);
    }

    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.dataset.filter;
            filterProducts(filter);
            updateTitle(filter);
        });
    });

    // Sort
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const activeFilter = document.querySelector('.filter-tab.active');
            filterProducts(activeFilter ? activeFilter.dataset.filter : 'all');
        });
    }
}

function filterProducts(filter) {
    const cards = document.querySelectorAll('.catalog-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const cats = card.dataset.category;
        const show = filter === 'all' || cats.includes(filter);
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
    });

    if (catalogEmpty) {
        catalogEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Re-sort
    if (sortSelect) sortProducts(sortSelect.value);
}

function sortProducts(sortBy) {
    if (!productGrid) return;
    const cards = [...productGrid.querySelectorAll('.catalog-card')];
    cards.sort((a, b) => {
        if (sortBy === 'price-asc') return parseInt(a.dataset.price) - parseInt(b.dataset.price);
        if (sortBy === 'price-desc') return parseInt(b.dataset.price) - parseInt(a.dataset.price);
        if (sortBy === 'name') return a.dataset.name.localeCompare(b.dataset.name, 'ru');
        return 0;
    });
    cards.forEach(card => productGrid.appendChild(card));
}

const CATEGORY_NAMES = {
    all: 'Каталог кашпо',
    bestsellers: 'Популярные товары',
    exclusive: 'Эксклюзивная серия',
    sets: 'Кашпо с подставкой',
    outdoor: 'Для улицы',
    indoor: 'Для помещений',
    accessories: 'Сопутствующие товары'
};

function updateTitle(filter) {
    if (catalogTitle) catalogTitle.textContent = CATEGORY_NAMES[filter] || 'Каталог кашпо';
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = CATEGORY_NAMES[filter] || 'Каталог';
}

// --- PRODUCT PAGE ---
const productMainImg = document.getElementById('productMainImg');
const productName = document.getElementById('productName');
const productDesc = document.getElementById('productDesc');
const productPrice = document.getElementById('productPrice');
const productBreadcrumb = document.getElementById('productBreadcrumb');
const productFullDesc = document.getElementById('productFullDesc');
const productThumbs = document.getElementById('productThumbs');
const relatedGrid = document.getElementById('relatedGrid');

if (productMainImg) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

    // Fill product data
    productMainImg.src = product.img;
    productMainImg.alt = product.name;
    productName.textContent = product.name;
    productDesc.textContent = product.desc;
    productPrice.textContent = product.price.toLocaleString('ru-RU') + ' ₽';
    productBreadcrumb.textContent = product.name;
    document.title = product.name + ' — Marble Collection';

    if (productFullDesc) {
        productFullDesc.innerHTML = '<p>' + product.fullDesc + '</p>';
    }

    // Thumbs (use same image + related)
    if (productThumbs) {
        const thumbImgs = [product.img];
        PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).forEach(p => thumbImgs.push(p.img));

        thumbImgs.forEach((src, i) => {
            const thumb = document.createElement('div');
            thumb.className = 'product-detail__thumb' + (i === 0 ? ' active' : '');
            thumb.innerHTML = `<img src="${src}" alt="">`;
            thumb.addEventListener('click', () => {
                productMainImg.src = src;
                document.querySelectorAll('.product-detail__thumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            productThumbs.appendChild(thumb);
        });
    }

    // Related products
    if (relatedGrid) {
        const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
        related.forEach(p => {
            relatedGrid.innerHTML += `
                <a href="product.html?id=${p.id}" class="catalog-card">
                    <div class="catalog-card__image">
                        <img src="${p.img}" alt="${p.name}">
                    </div>
                    <div class="catalog-card__info">
                        <h3 class="catalog-card__name">${p.name}</h3>
                        <p class="catalog-card__desc">${p.desc}</p>
                        <div class="catalog-card__bottom">
                            <span class="catalog-card__price">${p.price.toLocaleString('ru-RU')} ₽</span>
                        </div>
                    </div>
                </a>
            `;
        });
    }

    // Quantity
    const qtyInput = document.getElementById('qtyInput');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');

    if (qtyMinus) qtyMinus.addEventListener('click', () => {
        const v = parseInt(qtyInput.value);
        if (v > 1) qtyInput.value = v - 1;
    });

    if (qtyPlus) qtyPlus.addEventListener('click', () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    // Size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}
