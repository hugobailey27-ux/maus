// Database of Vladek's memories corresponding to scroll stages
const memoryData = {
  "1939": {
    title: "POLAND, 1939",
    text: '"The war came fast. I was drafted into the Polish army. We didn\'t know what was coming with the Germans, but already the shadows were stretching over us."',
    maskLabel: "[ MOUSE MASK: SOSNOWIEC ]"
  },
  "1942": {
    title: "GHETTO ROUNDUP, 1942",
    text: '"They registered us all in the stadium. Some got stamps on their passports to work, others were taken directly to the trains. Anja and I survived by hiding in cellars under coal piles."',
    maskLabel: "[ PIG MASK: POLISH DISGUISE ]"
  },
  "1944": {
    title: "AUSCHWITZ-BIRKENAU, 1944",
    text: '"We came in the night. The smoke from the chimneys... you could smell it before you saw it. Here, you were no longer a man. You were a number on your arm."',
    maskLabel: "[ CAT MASK: CAMPS ]"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".narrative-card");
  const memoryTitle = document.getElementById("memoryTitle");
  const memoryText = document.getElementById("memoryText");
  const memoryContent = document.getElementById("memoryContent");
  const illustrationText = document.querySelector(".illustration-text");

  // IntersectionObserver detects which present-day story card is currently on screen
  const observerOptions = {
    root: null,
    threshold: 0.6 // Card must be 60% visible to trigger memory transition
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Highlight active left-hand card
        cards.forEach((c) => c.classList.remove("active"));
        entry.target.classList.add("active");

        // Retrieve corresponding memory key
        const memoryKey = entry.target.getAttribute("data-memory");
        const data = memoryData[memoryKey];

        if (data) {
          // Fade-out effect before updating text
          memoryContent.style.opacity = 0;

          setTimeout(() => {
            memoryTitle.innerText = data.title;
            memoryText.innerText = data.text;
            illustrationText.innerText = data.maskLabel;
            memoryContent.style.opacity = 1;
          }, 300);
        }
      }
    });
  }, observerOptions);

  cards.forEach((card) => observer.observe(card));
});