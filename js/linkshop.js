const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

function applyFilters() {
    const term = (searchInput.value || '').toLowerCase().trim();
    const activeBtn = document.querySelector('.filter-btn.is-active');
    const category = activeBtn ? activeBtn.dataset.filter : 'all';

    cards.forEach(card => {
        const inCategory = category === 'all' || card.dataset.category === category;
        const text = card.innerText.toLowerCase();
        const match = !term || text.includes(term);
        card.style.display = (inCategory && match) ? '' : 'none';
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        applyFilters();
    });
});

searchInput.addEventListener('input', applyFilters);