const nominations = [
  {
    name: "John Okoro",
    role: "Youth Advocate",
    date: "July 12, 2025",
    description: "Helping young boys stay away from street violence in Lagos suburbs.",
    status: "pending"
  },
  {
    name: "Maryam Yusuf",
    role: "Community Health Worker",
    date: "July 10, 2025",
    description: "Organizing monthly wellness drives for low-income families in rural Kano.",
    status: "reviewed"
  },
  {
    name: "Michael Eze",
    role: "Disability Rights Advocate",
    date: "July 8, 2025",
    description: "Michael builds ramps and accessible paths in public areas using his own resources.",
    status: "featured"
  },
  // 👉 Add more nominations below
  {
    name: "Fatima Musa",
    role: "Youth Volunteer",
    date: "July 5, 2025",
    description: "Coordinated food drives for displaced communities in Borno.",
    status: "reviewed"
  },
  {
    name: "David Ali",
    role: "Education Champion",
    date: "July 3, 2025",
    description: "Offers free tutoring to orphans in Abuja.",
    status: "pending"
  },
  {
    name: "Grace Onuoha",
    role: "Climate Activist",
    date: "July 1, 2025",
    description: "Leads weekly cleanups of polluted rivers in Delta state.",
    status: "featured"
  }
  // You can add many more entries here!
];

const nominationsPerPage = 6;
let currentPage = 1;

function displayNominations() {
  const container = document.getElementById("nomination-container");
  container.innerHTML = "";

  const start = (currentPage - 1) * nominationsPerPage;
  const end = start + nominationsPerPage;
  const visible = nominations.slice(start, end);

  visible.forEach((nom) => {
    const div = document.createElement("div");
    div.className = "nomination-card";

    div.innerHTML = `
      <h3>${nom.name}</h3>
      <p class="role">${nom.role}</p>
      <p class="date">Nominated: ${nom.date}</p>
      <p>${nom.description}</p>
      <span class="status ${nom.status}">${nom.status.charAt(0).toUpperCase() + nom.status.slice(1)}</span>
    `;

    container.appendChild(div);
  });
}

function setupPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const pageCount = Math.ceil(nominations.length / nominationsPerPage);

  if (pageCount <= 1) return;

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    displayNominations();
    setupPagination();
  };
  pagination.appendChild(prevBtn);

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = currentPage === i ? "active" : "";
    btn.onclick = () => {
      currentPage = i;
      displayNominations();
      setupPagination();
    };
    pagination.appendChild(btn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === pageCount;
  nextBtn.onclick = () => {
    currentPage++;
    displayNominations();
    setupPagination();
  };
  pagination.appendChild(nextBtn);
}

displayNominations();
setupPagination();
