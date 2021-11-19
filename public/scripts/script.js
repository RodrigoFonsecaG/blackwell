// Menu ativo

const links = document.querySelectorAll('.links a')
const currentPage = window.location.pathname;

for(let link of links) {
  currentPage.includes(link.pathname) ? link.classList.add('active') : null
}

