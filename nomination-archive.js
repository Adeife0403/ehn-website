const nomineesPerPage = 6;
let currentPage = 1;
let nominees = [];

function fetchNominees() {
  fetch('nominees.json')
    .then(res => res.json())
    .then(data => {
      nominees = data;
      displayNominees(currentPage);
      setupPagination();
    });
}

function displayNominees(page) {
  const container = document.getElementById('nominees-container');
  container.innerHTML = "";

  const start = (page - 1) * nomineesPerPage;
  const end = start + nomineesPerPage;
  const pageNominees = nominees.slice(start, end);

  pageNominees.forEach(nominee => {
    const card = document.createElement('div');
    card.className = 'nominee-card';

    card.innerHTML = `
      <h3>${nominee.name}</h3>
      <p>${nominee.story}</p>
      <span class="status ${nominee.status.toLowerCase()}">${nominee.status}</span>
    `;
    container.appendChild(card);
  });
}

function setupPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = "";

  const totalPages = Math.ceil(nominees.length / nomineesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentPage = i;
      displayNominees(currentPage);
      setupPagination();
    });
    pagination.appendChild(btn);
  }
}

fetchNominees();
