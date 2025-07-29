document.addEventListener('DOMContentLoaded', function () {
  const nominations = [
    {
      name: "Hero Nominee 1",
      story: "Helped clean the community during floods.",
      status: "Pending"
    },
    {
      name: "Hero Nominee 2",
      story: "Organized food drives for the homeless.",
      status: "Reviewed"
    },
    {
      name: "Hero Nominee 3",
      story: "Taught underprivileged children during the lockdown.",
      status: "Pending"
    },
    {
      name: "Hero Nominee 4",
      story: "Saved animals during a fire outbreak.",
      status: "Reviewed"
    },
    {
      name: "Hero Nominee 5",
      story: "Raised awareness on mental health in schools.",
      status: "Pending"
    },
    {
      name: "Hero Nominee 6",
      story: "Built water filters for rural villages.",
      status: "Reviewed"
    },
    {
      name: "Hero Nominee 7",
      story: "Donated books and laptops to students.",
      status: "Reviewed"
    },
    {
      name: "Hero Nominee 8",
      story: "Volunteered as a medical assistant during crisis.",
      status: "Pending"
    },
    {
      name: "Hero Nominee 9",
      story: "Developed free tutoring programs.",
      status: "Reviewed"
    }
  ];

  const cardsPerPage = 6;
  let currentPage = 1;

  const container = document.getElementById('nomination-cards');
  const pagination = document.getElementById('pagination');

  function displayNominations() {
    container.innerHTML = '';

    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const currentItems = nominations.slice(start, end);

    currentItems.forEach(nomination => {
      const card = document.createElement('div');
      card.className = 'nomination-card';
      card.innerHTML = `
        <h3>${nomination.name}</h3>
        <p>${nomination.story}</p>
        <span class="status ${nomination.status.toLowerCase()}">${nomination.status}</span>
      `;
      container.appendChild(card);
    });

    updatePagination();
  }

  function updatePagination() {
    pagination.innerHTML = '';

    const totalPages = Math.ceil(nominations.length / cardsPerPage);

    const prev = document.createElement('button');
    prev.textContent = '« Prev';
    prev.disabled = currentPage === 1;
    prev.onclick = () => {
      currentPage--;
      displayNominations();
    };
    pagination.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === currentPage) btn.classList.add('active');
      btn.onclick = () => {
        currentPage = i;
        displayNominations();
      };
      pagination.appendChild(btn);
    }

    const next = document.createElement('button');
    next.textContent = 'Next »';
    next.disabled = currentPage === totalPages;
    next.onclick = () => {
      currentPage++;
      displayNominations();
    };
    pagination.appendChild(next);
  }

  displayNominations();
});
