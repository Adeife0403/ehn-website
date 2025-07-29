const heroes = [
    { name: "Ajun Babatunde", title: "Community Educator", image: "ajun.jpg", short: "Ajun has helped over 500 children access quality education in rural areas.", full: "Ajun Babatunde has helped over 500 children access quality education in rural areas by establishing mobile learning centers and training community teachers." },
    { name: "Sarah Olamide", title: "Volunteer First Responder", image: "sarah.jpg", short: "Sarah has saved lives during emergencies across her region.", full: "Sarah volunteers every weekend as an emergency medical responder, helping accident victims and supporting underfunded rural clinics." },
    { name: "Chinedu Okafor", title: "Youth Mentor", image: "chinedu.jpg", short: "Chinedu mentors young boys...", full: "Chinedu mentors young boys, helping them grow into responsible men through life coaching and after-school programs in inner-city communities." },
    { name: "Aisha Bello", title: "Environmental Advocate", image: "aisha.jpg", short: "Aisha organizes clean-up drives...", full: "Aisha organizes monthly clean-up drives and tree planting events to raise awareness about climate change and sustainable living." },
    { name: "Emeka Duru", title: "Neighborhood Guardian", image: "garbage.jpg", short: "Emeka ensures community safety...", full: "Emeka helps ensure community safety and care for the elderly in his neighborhood through daily patrols and volunteering for emergency response." },
    { name: "Grace Ijeoma", title: "Healthcare Volunteer", image: "grace.jpg", short: "Grace volunteers at clinics...", full: "Grace spends her weekends volunteering at clinics and helping underserved communities access basic healthcare and support." },
    { name: "Risi Adeola", title: "Women Empowerment Advocate", image: "risi.jpg", short: "Risi trains young women...", full: "Risi Adeola provides vocational training and mentorship to young women in low-income areas, helping them become financially independent and confident leaders." },
    { name: "Salaudeen Readwan", title: "Trick Friend", image: "Yak.jpg", short: "Salaudeen train gbewiri...", full: "Salaudeen has been tricking and dumping us for years ." }
];

let currentPage = 1;
const perPage = 6;

function renderHeroes() {
    const container = document.getElementById("heroContainer");
    container.innerHTML = "";
    const search = document.getElementById("searchInput").value.toLowerCase();
    const category = document.getElementById("categoryFilter").value;
    const filtered = heroes.filter(h =>
        (h.name.toLowerCase().includes(search) || h.short.toLowerCase().includes(search)) &&
        (category === "" || h.title === category)
    );

    const pageHeroes = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
    document.getElementById("pageNumber").textContent = `Page ${currentPage}`;

    for (let h of pageHeroes) {
        const card = document.createElement("div");
        card.className = "hero-card";
        card.innerHTML = `
            <img class="hero-img" src="images/${h.image}" alt="${h.name}">
            <h3>${h.name}</h3>
            <h4><strong>${h.title}</strong></h4>
            <p>${h.short}</p>
        `;
        card.onclick = () => showModal(h);
        container.appendChild(card);
    }

    // Disable/Enable pagination buttons
    document.querySelector(".pagination button:first-child").disabled = currentPage === 1;
    document.querySelector(".pagination button:last-child").disabled = currentPage * perPage >= filtered.length;
}

function filterHeroes() {
    currentPage = 1;
    renderHeroes();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderHeroes();
    }
}

function nextPage() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const category = document.getElementById("categoryFilter").value;
    const filtered = heroes.filter(h =>
        (h.name.toLowerCase().includes(search) || h.short.toLowerCase().includes(search)) &&
        (category === "" || h.title === category)
    );
    if (currentPage * perPage < filtered.length) {
        currentPage++;
        renderHeroes();
    }
}

function showModal(hero) {
    document.getElementById("modalImg").src = "images/" + hero.image;
    document.getElementById("modalName").textContent = hero.name;
    document.getElementById("modalTitle").textContent = hero.title;
    document.getElementById("modalStory").textContent = hero.full;
    document.getElementById("heroModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("heroModal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", renderHeroes);
