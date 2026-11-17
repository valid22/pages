const boot = document.querySelector(".boot");
const replay = document.querySelector(".replay");
const bootScreen = document.querySelector(".boot-screen");
const cover = bootScreen.querySelector(".boot-cover");
const mark = bootScreen.querySelector(".boot-mark");
const stamp = document.querySelector(".identity .stamp");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const roleText = document.querySelector(".role-type");
const roleMotion = document.querySelector(".role-motion");
const roles = ["Machine Learning", "Software Engineer", "Applied ML & LLM"];
const journey = document.querySelector(".journey");
const journeySwitch = document.querySelector(".journey-switch");
const viewButtons = [...journeySwitch.querySelectorAll("button")];
const milestones = [...journey.querySelectorAll(".milestone")];
const schools = milestones.filter(entry => entry.dataset.track === "school");
const rows = milestones.filter(entry => entry.dataset.track === "work").map(work => {
  const schoolIndex = schools.findIndex(school =>
    school.dataset.start <= work.dataset.end && work.dataset.start <= school.dataset.end,
  );
  return schoolIndex === -1 ? [work] : [work, ...schools.splice(schoolIndex, 1)];
});
rows.push(...schools.map(school => [school]));
rows.sort(([a], [b]) => b.dataset.start.localeCompare(a.dataset.start));
rows.forEach((entries, index) => {
  entries.forEach(entry => {
    entry.style.setProperty("--branch-row", index + 1);
    entry.toggleAttribute("data-shared", entries.length > 1);
  });
});

let roleIndex = 0;
let roleLength = roles[0].length;
let deleting = true;
let paused = false;
let roleTimer;

function typeNext() {
  const role = roles[roleIndex];
  roleLength += deleting ? -1 : 1;
  roleText.textContent = role.slice(0, roleLength);

  if (deleting && roleLength === 0) {
    roleIndex = (roleIndex + 1) % roles.length;
    deleting = false;
    scheduleHeadline(270);
  } else if (!deleting && roleLength === role.length) {
    deleting = true;
    scheduleHeadline(2200);
  } else {
    scheduleHeadline(deleting ? 42 : 86);
  }
}

function scheduleHeadline(delay) {
  clearTimeout(roleTimer);
  if (!paused && !reducedMotion.matches) roleTimer = setTimeout(typeNext, delay);
}

roleMotion.hidden = false;
roleMotion.addEventListener("click", () => {
  paused = !paused;
  roleMotion.textContent = paused ? "▶" : "Ⅱ";
  roleMotion.setAttribute("aria-label", paused ? "Resume headline animation" : "Pause headline animation");
  scheduleHeadline(200);
});

reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) {
    roleText.textContent = roles[roleIndex];
    roleLength = roles[roleIndex].length;
    deleting = true;
  }
  scheduleHeadline(2200);
});

journeySwitch.hidden = false;
viewButtons.forEach(button => {
  button.addEventListener("click", () => {
    journey.dataset.layout = button.dataset.view;
    viewButtons.forEach(view => view.setAttribute("aria-pressed", String(view === button)));
  });
});

function revealLinkedEntry() {
  const entry = document.getElementById(location.hash.slice(1));
  if (entry instanceof HTMLDetailsElement) entry.open = true;
}
window.addEventListener("hashchange", revealLinkedEntry);
revealLinkedEntry();

const caffeine = document.querySelector(".caffeine");
const caffeineMeter = caffeine.querySelector("meter");
const caffeineStatus = caffeine.querySelector("[role=status]");
const terminal = document.querySelector(".terminal");
const caffeineMessages = [
  "Running on vibes.",
  "Phosphor warming up.",
  "Terminal pressure rising.",
  "Some letters need space.",
  "Kerning has left the chat.",
];

function prepareCaffeineTypography() {
  document.querySelectorAll(".identity h1, .output h2 code, .boot .typed").forEach(heading => {
    for (const node of [...heading.childNodes]) {
      if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) continue;
      const label = document.createElement("span");
      label.className = "sr-only";
      label.textContent = node.textContent;
      const lettering = document.createElement("span");
      lettering.setAttribute("aria-hidden", "true");

      for (const part of node.textContent.split(/(\s+)/)) {
        if (!part.trim()) {
          lettering.append(part);
          continue;
        }
        const word = document.createElement("span");
        word.className = "caffeine-word";
        for (const character of part) {
          const glyph = document.createElement("span");
          glyph.className = "caffeine-glyph";
          glyph.textContent = character;
          const chance = Math.random();
          if (chance < .67) {
            glyph.dataset.drift = chance < .4 ? "early" : "late";
            glyph.style.setProperty("--glyph-direction", Math.random() < .5 ? -1 : 1);
            glyph.style.setProperty("--glyph-distance", (.45 + Math.random() * .55).toFixed(2));
            glyph.style.setProperty("--glyph-delay", `${Math.round(Math.random() * 280)}ms`);
          }
          word.append(glyph);
        }
        lettering.append(word);
      }
      node.replaceWith(label, lettering);
    }
  });
}

function setCaffeine(value) {
  const level = value / 25;
  caffeineMeter.value = value;
  caffeineStatus.textContent = `${value}% · ${caffeineMessages[level]}`;
  terminal.dataset.caffeine = level;
}

prepareCaffeineTypography();
caffeine.querySelector(".caffeine-actions").hidden = false;
caffeine.querySelector("[data-brew]").addEventListener("click", () => {
  setCaffeine(Math.min(100, caffeineMeter.value + 25));
});
caffeine.querySelector("[data-sleep]").addEventListener("click", () => setCaffeine(0));

async function playBoot() {
  if (!bootScreen.hidden || reducedMotion.matches || !mark.animate) return;

  clearTimeout(roleTimer);
  boot.classList.remove("booting");
  const target = stamp.getBoundingClientRect();
  const scale = Math.min(3.8, (innerWidth * .76) / target.width, (innerHeight * .44) / target.height);
  const x = (innerWidth - target.width) / 2 - target.left;
  const y = (innerHeight - target.height) / 2 - target.top;
  const centered = `translate(${x}px, ${y}px) scale(${scale})`;
  const logoLines = stamp.textContent.split("\n").map(text => {
    const line = document.createElement("span");
    line.textContent = text;
    return line;
  });
  mark.replaceChildren(...logoLines);
  mark.style.left = `${target.left}px`;
  mark.style.top = `${target.top}px`;
  mark.style.fontSize = getComputedStyle(stamp).fontSize;
  mark.style.width = `${target.width}px`;
  stamp.classList.add("stamp-docking");
  bootScreen.hidden = false;

  let lineStart = 0;
  const typing = logoLines.map(line => {
    const columns = line.textContent.length;
    const duration = columns * 15;
    const animation = line.animate(
      [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
      { delay: lineStart, duration, easing: `steps(${columns}, end)`, fill: "both" },
    );
    lineStart += duration + 55;
    return animation;
  });
  const centerHold = lineStart + 160;
  const bootDuration = centerHold + 1550;
  const dock = mark.animate(
    [
      { transform: centered },
      { transform: centered, offset: centerHold / bootDuration, easing: "cubic-bezier(.2,.72,.22,1)" },
      { transform: "none" },
    ],
    { duration: bootDuration, fill: "both" },
  );
  const coverDuration = bootDuration - 150;
  const reveal = cover.animate(
    [{ opacity: 1 }, { opacity: 1, offset: centerHold / coverDuration }, { opacity: 0 }],
    { duration: coverDuration, fill: "both" },
  );
  const animations = [...typing, dock, reveal];
  const cancelBoot = () => animations.forEach(animation => animation.cancel());
  window.addEventListener("resize", cancelBoot, { once: true });
  reducedMotion.addEventListener("change", cancelBoot, { once: true });
  try {
    await dock.finished;
  } catch {
    // Reveal the resting layout immediately if the viewport changes mid-flight.
  } finally {
    bootScreen.hidden = true;
    stamp.classList.remove("stamp-docking");
    cancelBoot();
    window.removeEventListener("resize", cancelBoot);
    reducedMotion.removeEventListener("change", cancelBoot);
  }
  if (reducedMotion.matches) return;
  boot.classList.add("booting");
  scheduleHeadline(1200);
}

replay.hidden = false;
replay.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "instant" });
  playBoot();
});
if ((!location.hash || location.hash === "#top") && mark.animate) {
  playBoot();
} else {
  scheduleHeadline(1900);
}
