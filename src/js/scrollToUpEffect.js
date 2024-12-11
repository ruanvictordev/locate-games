const btnTop = document.getElementById("btnTop");
const btnCart = document.getElementById("btnCart");

btnTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})

// Ocultar

document.addEventListener('scroll', ocult)

function ocult() {
    if (window.scrollY > 30) {
        btnTop.style.display = 'flex';
        btnCart.style.display = 'flex';
    } else {
        btnTop.style.display = 'none';
        btnCart.style.display = 'none';
    }
}

// Rolagem suave para os links do menu
const menuLinks = document.querySelectorAll('.menu a');

menuLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 116, 
      behavior: 'smooth'
    });
  });
});

ocult()