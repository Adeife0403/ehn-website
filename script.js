
const heroes = [
  {
    name: "Ajun Babatunde",
    role: "Community Educator",
    image: "ajun.jpg",
    category: "Educator",
    summary: "Ajun has helped over 500 children access quality education."
  },
  {
    name: "Sarah Olamide",
    role: "Volunteer First Responder",
    image: "sarah.jpg",
    category: "Responder",
    summary: "Sarah has saved lives during emergencies in her community."
  },
  {
    name: "Chinedu Okafor",
    role: "Youth Mentor",
    image: "chinedu.jpg",
    category: "Mentor",
    summary: "Chinedu guides young boys into responsible adulthood."
  },
  {
    name: "Aisha Bello",
    role: "Environmental Advocate",
    image: "aisha.jpg",
    category: "Volunteer",
    summary: "Aisha organizes clean-up drives and tree planting."
  },
  {
    name: "Emeka Duru",
    role: "Neighborhood Guardian",
    image: "emeka.jpg",
    category: "Responder",
    summary: "Emeka helps keep his community safe and elders cared for."
  },
  {
    name: "Grace Ijeoma",
    role: "Healthcare Volunteer",
    image: "grace.jpg",
    category: "Volunteer",
    summary: "Grace volunteers weekends at community health clinics."
  }
];

let currentPage = 1;
const itemsPerPage = 6;

function displayHeroes() {
  const container = document.getElementById("hero-container");
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("category-filter").value;

  const filtered = heroes.filter(h =>
    (h.name.toLowerCase().includes(search) || h.role.toLowerCase().includes(search)) &&
    (category === "All" || h.category === category)
  );

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedHeroes = filtered.slice(start, start + itemsPerPage);

  container.innerHTML = "";
  paginatedHeroes.forEach(hero => {
    const card = document.createElement("div");
    card.className = "hero-card";
    card.innerHTML = `
      <img src="images/${hero.image}" alt="${hero.name}">
      <h3>${hero.name}</h3>
      <h4>${hero.role}</h4>
      <p>${hero.summary}</p>
    `;
    container.appendChild(card);
  });

  document.getElementById("pageNumber").innerText = currentPage;
}

document.getElementById("search").addEventListener("input", () => {
  currentPage = 1;
  displayHeroes();
});
document.getElementById("category-filter").addEventListener("change", () => {
  currentPage = 1;
  displayHeroes();
});
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayHeroes();
  }
});
document.getElementById("nextBtn").addEventListener("click", () => {
  currentPage++;
  displayHeroes();
});

displayHeroes();
