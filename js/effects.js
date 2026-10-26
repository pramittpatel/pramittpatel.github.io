/* ==========================================================================
   effects.js: decoration only. Every effect here is optional. If you
   delete this file (and its <script> tag), the site still works; it just
   stops animating.

     1. Scroll progress bar at the very top of the page
     2. Sections that slide in as you scroll
     3. Stats that count up from zero
     4. Project cards that tilt and light up under the mouse
     5. The animated network drawing behind the hero

   All of them switch off when the visitor's device is set to "reduce motion".
   ========================================================================== */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Tells styles.css that effects are running (used by the slide-in effect).
document.documentElement.classList.add("effects-on");


/* --------------------------------------------------------------------------
   1. Scroll progress bar
   -------------------------------------------------------------------------- */
function updateScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  bar.style.width = percent + "%";
}


/* --------------------------------------------------------------------------
   2. Slide in on scroll
   Elements with class="reveal" get "is-visible" the first time they appear.
   -------------------------------------------------------------------------- */
function setUpRevealOnScroll() {
  const elements = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // only animate once
        }
      }
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
}


/* --------------------------------------------------------------------------
   3. Count-up numbers
   Any element with data-count-to="65" counts from 0 to 65 when it scrolls
   into view. Optional: data-decimals="1" and data-suffix="+".
   -------------------------------------------------------------------------- */
function animateCount(element) {
  const target = Number(element.dataset.countTo);
  const decimals = Number(element.dataset.decimals || 0);
  const suffix = element.dataset.suffix || "";
  const duration = 1300; // milliseconds
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3); // starts fast, slows down at the end
    element.textContent = (target * easedProgress).toFixed(decimals) + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function setUpCountUp() {
  if (prefersReducedMotion) {
    return; // the real numbers are already written in the HTML
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    }
  });

  document.querySelectorAll("[data-count-to]").forEach((element) => observer.observe(element));
}


/* --------------------------------------------------------------------------
   4. Card tilt and spotlight
   -------------------------------------------------------------------------- */
function handleCardPointerMove(event) {
  const card = event.currentTarget;
  const box = card.getBoundingClientRect();
  const x = event.clientX - box.left;
  const y = event.clientY - box.top;

  // Move the soft light (see .project-card::before in styles.css)
  card.style.setProperty("--mouse-x", x + "px");
  card.style.setProperty("--mouse-y", y + "px");

  // Tilt only for a real mouse; on touch screens it would feel odd.
  if (prefersReducedMotion || event.pointerType !== "mouse") {
    return;
  }
  const tiltX = (y / box.height - 0.5) * -5; // degrees
  const tiltY = (x / box.width - 0.5) * 5;
  card.style.transform =
    `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
}

function resetCardTilt(event) {
  event.currentTarget.style.transform = "";
}

function setUpCardEffects() {
  for (const card of document.querySelectorAll(".project-card")) {
    card.addEventListener("pointermove", handleCardPointerMove);
    card.addEventListener("pointerleave", resetCardTilt);
  }
}


/* --------------------------------------------------------------------------
   5. Hero network animation
   Draws dots in columns (like layers of a neural network), joins
   neighbouring columns with lines, and sends small glowing signals along
   the lines. Dots near the mouse grow a little.
   -------------------------------------------------------------------------- */
function setUpHeroNetwork() {
  const canvas = document.getElementById("hero-network");
  const context = canvas.getContext("2d");

  const LAYER_SIZES = [4, 7, 8, 6, 3]; // number of dots in each column
  const MAX_SIGNALS = 26;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  // Use the same colors as the rest of the site (set in styles.css).
  const styles = getComputedStyle(document.documentElement);
  const accentColor = styles.getPropertyValue("--color-accent").trim();
  const surfaceColor = styles.getPropertyValue("--color-surface").trim();

  let width = 0;
  let height = 0;
  let nodes = [];   // each dot: { layer, x, y, phase }
  let edges = [];   // each line: [indexOfFirstDot, indexOfSecondDot]
  let signals = []; // each signal: { edge, progress, speed }
  let mouse = { x: -1000, y: -1000 };
  let isOnScreen = true;

  // Works out where every dot and line goes for the current canvas size.
  function buildNetwork() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    // On narrow screens the network fills more of the width.
    const left = width < 820 ? width * 0.12 : width * 0.42;
    const right = width * 0.95;

    nodes = [];
    LAYER_SIZES.forEach((count, layer) => {
      const x = left + (right - left) * (layer / (LAYER_SIZES.length - 1));
      const offset = layer % 2 === 0 ? -14 : 14; // stagger columns slightly
      for (let i = 0; i < count; i++) {
        const y = height * 0.12 + height * 0.76 * ((i + 0.5) / count) + offset;
        nodes.push({ layer, x, y, phase: Math.random() * Math.PI * 2 });
      }
    });

    // Connect about half of the dots in neighbouring columns.
    edges = [];
    nodes.forEach((a, indexA) => {
      nodes.forEach((b, indexB) => {
        if (b.layer === a.layer + 1 && Math.random() < 0.55) {
          edges.push([indexA, indexB]);
        }
      });
    });
  }

  function drawEdges() {
    context.strokeStyle = accentColor;
    context.globalAlpha = 0.13;
    context.lineWidth = 1;
    for (const [a, b] of edges) {
      context.beginPath();
      context.moveTo(nodes[a].x, nodes[a].y);
      context.lineTo(nodes[b].x, nodes[b].y);
      context.stroke();
    }
    context.globalAlpha = 1;
  }

  function maybeAddSignal() {
    if (signals.length < MAX_SIGNALS && Math.random() < 0.18 && edges.length > 0) {
      const edge = edges[Math.floor(Math.random() * edges.length)];
      signals.push({ edge, progress: 0, speed: 0.006 + Math.random() * 0.008 });
    }
  }

  function moveAndDrawSignals() {
    signals = signals.filter((signal) => signal.progress < 1);

    for (const signal of signals) {
      signal.progress += signal.speed;
      const start = nodes[signal.edge[0]];
      const end = nodes[signal.edge[1]];
      const x = start.x + (end.x - start.x) * signal.progress;
      const y = start.y + (end.y - start.y) * signal.progress;

      // A small glow: solid in the middle, fading out to the edge.
      const glow = context.createRadialGradient(x, y, 0, x, y, 9);
      glow.addColorStop(0, accentColor);
      glow.addColorStop(1, "transparent");
      context.globalAlpha = 0.9;
      context.fillStyle = glow;
      context.beginPath();
      context.arc(x, y, 9, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
  }

  function drawNodes(time) {
    context.lineWidth = 1.4;
    for (const node of nodes) {
      const distanceToMouse = Math.hypot(node.x - mouse.x, node.y - mouse.y);
      const closeness = distanceToMouse < 110 ? 1 - distanceToMouse / 110 : 0;
      const breathing = Math.sin(time / 900 + node.phase) * 0.6;
      const radius = 3 + breathing + closeness * 3;

      context.fillStyle = surfaceColor;
      context.strokeStyle = accentColor;
      context.globalAlpha = closeness > 0 ? 1 : 0.55;
      context.beginPath();
      context.arc(node.x, node.y, radius, 0, Math.PI * 2);
      context.fill();
      context.stroke();
    }
    context.globalAlpha = 1;
  }

  function drawFrame(time) {
    context.clearRect(0, 0, width, height);
    drawEdges();
    if (!prefersReducedMotion) {
      maybeAddSignal();
      moveAndDrawSignals();
    }
    drawNodes(time);
  }

  // Keeps drawing about 60 times a second while the hero is on screen.
  function animate(time) {
    drawFrame(time);
    if (isOnScreen) {
      requestAnimationFrame(animate);
    }
  }

  function trackMouse(event) {
    const box = canvas.getBoundingClientRect();
    mouse = { x: event.clientX - box.left, y: event.clientY - box.top };
  }

  // Pause the animation when the hero scrolls out of view, to save battery.
  function pauseWhenOffScreen() {
    const observer = new IntersectionObserver((entries) => {
      const wasOnScreen = isOnScreen;
      isOnScreen = entries[0].isIntersecting;
      if (isOnScreen && !wasOnScreen) {
        requestAnimationFrame(animate);
      }
    });
    observer.observe(canvas);
  }

  buildNetwork();
  window.addEventListener("resize", () => {
    buildNetwork();
    drawFrame(0);
  });

  if (prefersReducedMotion) {
    drawFrame(0); // one still picture, no animation
    return;
  }

  canvas.parentElement.addEventListener("pointermove", trackMouse);
  pauseWhenOffScreen();
  requestAnimationFrame(animate);
}


/* --------------------------------------------------------------------------
   Start all effects
   -------------------------------------------------------------------------- */
window.addEventListener("scroll", updateScrollProgress, { passive: true });
setUpRevealOnScroll();
setUpCountUp();
setUpCardEffects();
setUpHeroNetwork();
