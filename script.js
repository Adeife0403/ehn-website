
const heroes = [
  {
    name: "Ajun Babatunde",
    role: "Community Educator",
    category: "Education",
    image: "images/ajun.jpg",
    short: "Ajun has helped over 500 children access quality education in rural areas.",
    full: "Ajun works with rural communities, providing educational materials and support to children. He has built learning centers in 3 villages."
  },
  {
    name: "Sarah Olamide",
    role: "Volunteer First Responder",
    category: "Health",
    image: "images/sarah.jpg",
    short: "Sarah has saved lives during emergencies across her region.",
    full: "Sarah volunteers every weekend as an emergency medical responder, saving lives across multiple states."
  },
  {
    name: "Chinedu Okafor",
    role: "Youth Mentor",
    category: "Youth",
    image: "images/chinedu.jpg",
    short: "Chinedu mentors young boys, helping them grow into responsible men.",
    full: "He runs a mentorship program in Lagos, supporting over 100 teenage boys."
  }
];

let currentPage = 1;
const perPage = 3;

function renderHeroes() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;

  const filtered = heroes.filter(h =>
    h.name.toLowerCase().includes(searchValue) &&
    (category === "" || h.category === category)
  );

  const container = document.getElementById('heroContainer');
  container.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  paginated.forEach(hero => {
    const card = document.createElement("div");
    card.className = "hero-card";
    card.innerHTML = `
      <img src="${hero.image}" alt="Hero Image">
      <h3>${hero.name}</h3>
      <h4>${hero.role}</h4>
      <p>${hero.short}</p>
    `;
    card.onclick = () => openModal(hero);
    container.appendChild(card);
  });

  document.getElementById("pageNumber").innerText = `Page ${currentPage}`;
}

function openModal(hero) {
  document.getElementById("modalImage").src = hero.image;
  document.getElementById("modalName").innerText = hero.name;
  document.getElementById("modalRole").innerText = hero.role;
  document.getElementById("modalStory").innerText = hero.full;
  document.getElementById("heroModal").style.display = "block";
}

document.getElementById("modalClose").onclick = function () {
  document.getElementById("heroModal").style.display = "none";
};

document.getElementById("prevPage").onclick = function () {
  if (currentPage > 1) {
    currentPage--;
    renderHeroes();
  }
};

document.getElementById("nextPage").onclick = function () {
  const totalPages = Math.ceil(heroes.length / perPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderHeroes();
  }
};

document.getElementById("searchInput").addEventListener("input", () => {
  currentPage = 1;
  renderHeroes();
});
document.getElementById("categoryFilter").addEventListener("change", () => {
  currentPage = 1;
  renderHeroes();
});

window.onload = () => {
  const categories = [...new Set(heroes.map(h => h.category))];
  const select = document.getElementById("categoryFilter");
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.text = cat;
    select.appendChild(opt);
  });
  renderHeroes();
};
