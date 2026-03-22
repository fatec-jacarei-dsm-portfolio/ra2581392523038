// Cria o observador de interseção
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Se o elemento estiver visível na tela
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15, // Ativa quando 15% da seção estiver visível
  },
);

// Seleciona todas as suas seções e manda o observador monitorá-las
const elements = document.querySelectorAll("section");
elements.forEach((el) => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

const textElement = document.getElementById("typing-text");
const phrases = ["Designer", "Analista de Suporte", "Especialista em TI"];
let i = 0,
  j = 0,
  isDeleting = false;

function type() {
  if (!textElement) return; // se o elemento não existir, aborta

  const currentPhrase = phrases[i];

  if (isDeleting) {
    j = Math.max(0, j - 1);
    textElement.textContent = currentPhrase.substring(0, j);
  } else {
    j = Math.min(currentPhrase.length, j + 1);
    textElement.textContent = currentPhrase.substring(0, j);
  }

  if (!isDeleting && j === currentPhrase.length) {
    isDeleting = true;
    setTimeout(type, 2000);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 100 : 200);
  }
}

type();

// Seleciona todos os cards de skill
const skills = document.querySelectorAll(".caixa-skill");

// Cria o elemento do tooltip dinamicamente
const tooltip = document.createElement("div");
tooltip.id = "skill-tooltip";
document.body.appendChild(tooltip);

// Estilização básica via JS para garantir que funcione
Object.assign(tooltip.style, {
  position: "absolute",
  display: "none",
  padding: "10px 15px",
  backgroundColor: "#000",
  color: "#fff",
  borderRadius: "8px",
  fontSize: "14px",
  zIndex: "1000",
  pointerEvents: "none",
  boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
  border: "1px solid #72b5f2",
});

skills.forEach((skill) => {
  skill.addEventListener("mouseenter", (e) => {
    tooltip.textContent = skill.getAttribute("data-info");
    tooltip.style.display = "block";
  });

  skill.addEventListener("mousemove", (e) => {
    // Posiciona o tooltip 15px ao lado e abaixo do mouse
    tooltip.style.left = e.pageX + 15 + "px";
    tooltip.style.top = e.pageY + 15 + "px";
  });

  skill.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
});
