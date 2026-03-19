const bootText = document.getElementById("bootText");
const nameArea = document.getElementById("nameArea");
const accessArea = document.getElementById("accessArea");
const accessLine1 = document.getElementById("accessLine1");
const accessLine2 = document.getElementById("accessLine2");
const enterBtn = document.getElementById("enterBtn");
const nameInput = document.getElementById("nameInput");
const introScreen = document.getElementById("introScreen");
const siteContent = document.getElementById("siteContent");
const welcomeTitle = document.getElementById("welcomeTitle");

const radioBtn = document.getElementById("radioBtn");
const radioText = document.getElementById("radioText");
const radioStatus = document.getElementById("radioStatus");
const spotifyBox = document.getElementById("spotifyBox");
const knobs = document.querySelectorAll(".knob");

const bootLines = [
  "> Inicializando sistema...",
  "> Carregando arquivos pessoais...",
  "> Recuperando identidade visual...",
  "> Interface pronta."
];

let lineIndex = 0;
let charIndex = 0;
let radioOn = false;

/* beep simples */
function beep(frequency = 880, duration = 0.02, volume = 0.012) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  } catch (error) {
    // segue sem som se o navegador bloquear
  }
}

/* boot inicial */
function typeBoot() {
  if (lineIndex < bootLines.length) {
    const currentLine = bootLines[lineIndex];

    if (charIndex < currentLine.length) {
      bootText.innerHTML += currentLine.charAt(charIndex);
      charIndex++;
      beep(920, 0.018, 0.01);
      setTimeout(typeBoot, 42);
    } else {
      bootText.innerHTML += "<br>";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeBoot, 220);
    }
  } else {
    setTimeout(() => {
      nameArea.classList.remove("hidden");
      nameInput.focus();
    }, 350);
  }
}

typeBoot();

/* digitação */
enterBtn.addEventListener("click", startExperience);

nameInput.addEventListener("keydown", (event) => {
  beep(760, 0.015, 0.008);

  if (event.key === "Enter") {
    startExperience();
  }
});

function startExperience() {
  const typedName = nameInput.value.trim();

  if (!typedName) {
    nameInput.focus();
    return;
  }

  showAccess(typedName);
}

function showAccess(name) {
  nameArea.classList.add("hidden");
  accessArea.classList.remove("hidden");

  const line1 = "> Acesso concedido";
  const line2 = `> Bem-vindo, ${name}`;

  accessLine1.textContent = "";
  accessLine2.textContent = "";

  let i = 0;

  function typeLine1() {
    if (i < line1.length) {
      accessLine1.textContent += line1.charAt(i);
      beep(880, 0.02, 0.012);
      i++;
      setTimeout(typeLine1, 40);
    } else {
      let j = 0;

      function typeLine2() {
        if (j < line2.length) {
          accessLine2.textContent += line2.charAt(j);
          beep(720, 0.02, 0.012);
          j++;
          setTimeout(typeLine2, 40);
        } else {
          document.body.classList.add("shake");

          setTimeout(() => {
            introScreen.classList.add("hidden");
            siteContent.classList.remove("hidden");
            welcomeTitle.textContent = `Bem-vindo, ${name}.`;
            document.body.classList.remove("shake");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 900);
        }
      }

      setTimeout(typeLine2, 260);
    }
  }

  typeLine1();
}

/* rádio */
radioBtn.addEventListener("click", toggleRadio);

function toggleRadio() {
  radioOn = !radioOn;

  knobs.forEach((knob) => {
    knob.classList.remove("active");
    void knob.offsetWidth;
    knob.classList.add("active");
  });

  if (radioOn) {
    radioStatus.textContent = "LIGADO";
    radioText.textContent = "Frequência encontrada. Névoa sonora ativa.";
    spotifyBox.classList.remove("hidden");
    radioBtn.textContent = "■ Desligar Rádio";
    beep(620, 0.05, 0.015);
  } else {
    radioStatus.textContent = "DESLIGADO";
    radioText.textContent = "Frequência carregada. Pressione o botão para ligar.";
    spotifyBox.classList.add("hidden");
    radioBtn.textContent = "▶ Ligar Rádio";
    beep(420, 0.05, 0.015);
  }
}

/* lanterna */
document.addEventListener("mousemove", (event) => {
  document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
  document.documentElement.style.setProperty("--my", `${event.clientY}px`);
});