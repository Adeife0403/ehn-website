const heroes = [
    { name: "Ajun Babatunde", title: "Community Educator", story: "Ajun has helped over 500 children access quality education in rural areas.", category: "Community Educator", image: "images/heroes/ajun.jpg", fullStory: "Ajun tirelessly teaches underprivileged children..." },
    { name: "Sarah Olamide", title: "Volunteer First Responder", story: "Sarah has saved lives during emergencies across her region.", category: "Volunteer First Responder", image: "images/heroes/sarah.jpg", fullStory: "Sarah volunteers every weekend as an emergency medical responder..." },
    { name: "Chinedu Okafor", title: "Youth Mentor", story: "Chinedu mentors young boys, helping them grow into responsible men.", category: "Youth Mentor", image: "images/heroes/chinedu.jpg", fullStory: "Chinedu started a mentorship program in his local church..." },
    { name: "Aisha Bello", title: "Environmental Advocate", story: "Aisha organizes monthly clean-up drives and tree planting events.", category: "Environmental Advocate", image: "images/heroes/aisha.jpg", fullStory: "Aisha campaigns against pollution and educates communities..." },
    { name: "Emeka Duru", title: "Neighborhood Guardian", story: "Emeka helps ensure community safety and care for the elderly.", category: "Neighborhood Guardian", image: "images/heroes/emeka.jpg", fullStory: "Emeka volunteers to patrol neighborhoods and check on senior citizens..." },
    { name: "Grace Ijeoma", title: "Healthcare Volunteer", story: "Grace volunteers at community health clinics on weekends.", category: "Healthcare Volunteer", image: "images/heroes/grace.jpg", fullStory: "Grace assists doctors and nurses in providing free services..." }
];

const itemsPerPage = 6;
let currentPage = 1;

function displayHeroes() {
    const container = document.getElementById('heroContainer');
    const search = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    const filtered = heroes.filter(h =>
        h.name.toLowerCase().includes(search) &&
        (category === "" || h.category === category)
    );

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedHeroes = filtered.slice(start, end);

    container.innerHTML = paginatedHeroes.map(h => `
        <div class="hero-card" onclick="showModal('${h.name}')">
            <img src="${h.image}" alt="${h.name}">
            <h3>${h.name}</h3>
            <h4>${h.title}</h4>
            <p>${h.story}</p>
        </div>
    `).join('');

    displayPagination(filtered.length);
}

function displayPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }
}

function changePage(page) {
    currentPage = page;
    displayHeroes();
}

function showModal(name) {
    const hero = heroes.find(h => h.name === name);
    document.getElementById('modalImage').src = hero.image;
    document.getElementById('modalName').textContent = hero.name;
    document.getElementById('modalTitle').textContent = hero.title;
    document.getElementById('modalFullStory').textContent = hero.fullStory;

    document.getElementById('heroModal').style.display = "block";
}

document.querySelector(".close").onclick = function() {
    document.getElementById("heroModal").style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById("heroModal")) {
        document.getElementById("heroModal").style.display = "none";
    }
}

document.getElementById('searchInput').addEventListener('input', () => { currentPage = 1; displayHeroes(); });
document.getElementById('categoryFilter').addEventListener('change', () => { currentPage = 1; displayHeroes(); });

displayHeroes();