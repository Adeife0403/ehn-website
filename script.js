
const heroes = [
  {
    name: "Ajun Babatunde",
    category: "Community",
    title: "Community Educator",
    shortBio: "Ajun has helped over 500 children access quality education.",
    fullStory: "Ajun launched a weekend literacy initiative in Lagos, which has grown to reach over 1000 students. She now collaborates with 15 local volunteers.",
    image: "images/ajun.jpg"
  },
  {
    name: "Sarah Olamide",
    category: "Health",
    title: "Volunteer First Responder",
    shortBio: "Sarah has saved lives during emergencies in her community.",
    fullStory: "Sarah volunteers with the Red Cross and has trained over 50 others in basic emergency response.",
    image: "images/sarah.jpg"
  },
  {
    name: "Chinedu Okafor",
    category: "Youth",
    title: "Youth Mentor",
    shortBio: "Chinedu guides young boys into responsible adulthood.",
    fullStory: "He founded a neighborhood youth mentorship group that helps boys stay in school and avoid violence.",
    image: "images/chinedu.jpg"
  },
  {
    name: "Aisha Bello",
    category: "Environment",
    title: "Environmental Advocate",
    shortBio: "Aisha organizes clean-up drives and tree planting.",
    fullStory: "She has planted over 1,000 trees and runs monthly cleanups in Abuja.",
    image: "images/aisha.jpg"
  },
  {
    name: "Emeka Duru",
    category: "Safety",
    title: "Neighborhood Guardian",
    shortBio: "Emeka helps keep his community safe and elders cared for.",
    fullStory: "He volunteers for night watch duties and assists elderly residents with shopping and errands.",
    image: "images/emeka.jpg"
  },
  {
    name: "Grace Ijeoma",
    category: "Health",
    title: "Healthcare Volunteer",
    shortBio: "Grace volunteers weekends at community health clinics.",
    fullStory: "Grace is a nursing student who spends her weekends volunteering and offering free check-ups.",
    image: "images/grace.jpg"
  }
];

const heroGrid = document.getElementById("heroGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const modal = document.getElementById("heroModal");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalStory = document.getElementById("modalStory");
const modalImage = document.getElementById("modalImage");

let currentPage = 1;
const perPage = 6;

function renderHeroes() {
  let filtered = heroes.filter(h =>
    h.name.toLowerCase().includes(searchInput.value.toLowerCase()) &&
    (categoryFilter.value === "All" || h.category === categoryFilter.value)
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  heroGrid.innerHTML = "";
  filtered.slice(start, end).forEach(hero => {
    const card = document.createElement("div");
    card.className = "hero-card";
    card.innerHTML = \`
      <img src="\${hero.image}" class="hero-img" alt="\${hero.name}">
      <h3>\${hero.name}</h3>
      <p><strong>\${hero.title}</strong></p>
      <p>\${hero.shortBio}</p>
    \`;
    card.onclick = () => openModal(hero);
    heroGrid.appendChild(card);
  });

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.onclick = () => {
      currentPage = i;
      renderHeroes();
    };
    if (i === currentPage) btn.style.fontWeight = "bold";
    pagination.appendChild(btn);
  }
}

function openModal(hero) {
  modalName.textContent = hero.name;
  modalRole.textContent = hero.title;
  modalStory.textContent = hero.fullStory;
  modalImage.src = hero.image;
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

searchInput.addEventListener("input", renderHeroes);
categoryFilter.addEventListener("change", renderHeroes);

const categories = [...new Set(heroes.map(h => h.category))];
categories.forEach(cat => {
  const option = document.createElement("option");
  option.value = cat;
  option.textContent = cat;
  categoryFilter.appendChild(option);
});

renderHeroes();
