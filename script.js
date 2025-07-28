const heroes = [
  {
    name: "Ajun Babatunde",
    title: "Community Educator",
    bio: "Ajun has helped over 500 children access quality education in rural areas.",
    fullBio: "Ajun has organized several education outreach programs to teach literacy, train teachers, and provide learning resources for children in underserved areas.",
    category: "Education",
    image: "https://via.placeholder.com/100"
  },
  {
    name: "Sarah Olamide",
    title: "Volunteer First Responder",
    bio: "Sarah has saved lives during emergencies across her region.",
    fullBio: "Sarah volunteers every weekend as an emergency medical responder, saving lives across multiple states.",
    category: "Health",
    image: "https://via.placeholder.com/100"
  },
  {
    name: "Chinedu Okafor",
    title: "Youth Mentor",
    bio: "Chinedu mentors young boys, helping them grow into responsible men.",
    fullBio: "Chinedu leads a weekly mentorship group that helps young men learn life skills and stay in school.",
    category: "Mentorship",
    image: "https://via.placeholder.com/100"
  }
];

let currentPage = 1;
const perPage = 3;

function displayHeroes() {
  const grid = document.getElementById('heroGrid');
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;

  const filtered = heroes.filter(h =>
    (h.name.toLowerCase().includes(search) || h.title.toLowerCase().includes(search)) &&
    (category === "all" || h.category === category)
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  document.getElementById('pageInfo').textContent = \`Page \${currentPage}\`;

  grid.innerHTML = "";

  filtered.slice((currentPage - 1) * perPage, currentPage * perPage).forEach(h => {
    const card = document.createElement('div');
    card.className = 'hero-card';
    card.innerHTML = \`
      <img src="\${h.image}" alt="\${h.name}" />
      <h3>\${h.name}</h3>
      <h4>\${h.title}</h4>
      <p>\${h.bio}</p>
    \`;
    card.onclick = () => showModal(h);
    grid.appendChild(card);
  });

  document.getElementById('prevBtn').disabled = currentPage === 1;
  document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

function showModal(hero) {
  document.getElementById('modalImage').src = hero.image;
  document.getElementById('modalName').textContent = hero.name;
  document.getElementById('modalTitle').textContent = hero.title;
  document.getElementById('modalFullBio').textContent = hero.fullBio;
  document.getElementById('heroModal').style.display = 'block';
}

document.querySelector('.close-btn').onclick = () => {
  document.getElementById('heroModal').style.display = 'none';
};

window.onclick = event => {
  if (event.target === document.getElementById('heroModal')) {
    document.getElementById('heroModal').style.display = 'none';
  }
};

document.getElementById('searchInput').addEventListener('input', () => {
  currentPage = 1;
  displayHeroes();
});

document.getElementById('categoryFilter').addEventListener('change', () => {
  currentPage = 1;
  displayHeroes();
});

document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayHeroes();
  }
});
document.getElementById('nextBtn').addEventListener('click', () => {
  currentPage++;
  displayHeroes();
});

window.onload = () => {
  const uniqueCategories = [...new Set(heroes.map(h => h.category))];
  const categorySelect = document.getElementById('categoryFilter');
  uniqueCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
  displayHeroes();
};