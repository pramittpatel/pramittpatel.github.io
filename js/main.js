/* ==========================================================================
   main.js: what the site DOES.
     1. Builds the project cards from the PROJECTS list (js/projects-data.js).
     2. Shows a single project's page when the address ends in #project-id.
     3. Runs the navigation: phone menu and highlighting the current section.

   You do not need to edit this file to add a project or change your details.
   ========================================================================== */

// The sections on the home page, in the same order as the navigation links.
const SECTION_IDS = ["home", "projects", "about", "experience", "skills", "contact"];

// Elements we use more than once.
const homeView = document.getElementById("home-view");
const projectView = document.getElementById("project-view");
const projectGrid = document.getElementById("project-grid");
const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");

// Remembers where the visitor was on the home page before opening a project,
// so the Back button can return them to the same spot.
let savedHomeScroll = 0;


/* --------------------------------------------------------------------------
   Small helpers
   -------------------------------------------------------------------------- */

// Finds a project in the list by its id. Returns undefined if there is none.
function findProject(id) {
  return PROJECTS.find((project) => project.id === id);
}

// Fills a <ul> with one <li> per technology.
function fillTagList(listElement, technologies) {
  for (const name of technologies) {
    const item = document.createElement("li");
    item.textContent = name;
    listElement.appendChild(item);
  }
}

// Shows the project image, or removes the image area if there is no image,
// so visitors never see a broken picture.
function fillImage(imageWrapper, project) {
  if (!project.image) {
    imageWrapper.remove();
    return;
  }
  const image = imageWrapper.querySelector("img");
  image.src = project.image;
  image.alt = project.imageAlt || "";
}

// Shows optional text such as the event line, or removes the element if empty.
function fillOptionalText(element, text) {
  if (text) {
    element.textContent = text;
  } else {
    element.remove();
  }
}

// Creates a button-style link that opens in a new tab.
function createLinkButton(url, label, isPrimary) {
  const link = document.createElement("a");
  link.className = isPrimary ? "btn btn-primary" : "btn";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = label;
  return link;
}

// Copies the HTML inside a <template> tag so we can fill it in.
function copyTemplate(templateId) {
  const template = document.getElementById(templateId);
  return template.content.firstElementChild.cloneNode(true);
}


/* --------------------------------------------------------------------------
   1. Project cards on the home page
   -------------------------------------------------------------------------- */

function createProjectCard(project) {
  const card = copyTemplate("project-card-template");

  fillImage(card.querySelector(".project-cover"), project);
  card.querySelector(".project-category").textContent = project.category;
  card.querySelector(".project-title").textContent = project.title;
  fillOptionalText(card.querySelector(".project-event"), project.event);
  card.querySelector(".project-description").textContent = project.description;
  fillTagList(card.querySelector(".tag-list"), project.technologies);

  // The first highlight number appears at the bottom of the card.
  const highlight = card.querySelector(".project-highlight");
  if (project.highlights && project.highlights.length > 0) {
    highlight.querySelector("strong").textContent = project.highlights[0].value;
    highlight.querySelector("span").textContent = project.highlights[0].label;
  } else {
    highlight.remove();
  }

  const link = card.querySelector(".project-link");
  link.href = "#" + project.id;
  link.querySelector(".visually-hidden").textContent = ": " + project.title;

  return card;
}

function renderProjectCards() {
  for (const project of PROJECTS) {
    projectGrid.appendChild(createProjectCard(project));
  }
}


/* --------------------------------------------------------------------------
   2. Single project page
   -------------------------------------------------------------------------- */

// Builds one heading + text/bullets block for the project page.
function createProjectSection(section) {
  const wrapper = document.createElement("section");
  wrapper.className = "project-section";

  const heading = document.createElement("h2");
  heading.textContent = section.heading;
  wrapper.appendChild(heading);

  if (section.text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = section.text;
    wrapper.appendChild(paragraph);
  }

  if (section.bullets) {
    const list = document.createElement("ul");
    for (const bullet of section.bullets) {
      const item = document.createElement("li");
      item.textContent = bullet;
      list.appendChild(item);
    }
    wrapper.appendChild(list);
  }

  return wrapper;
}

// Builds a box for one highlight number, e.g. "0.85+ / ROC-AUC score".
function createHighlightBox(highlight) {
  const box = document.createElement("div");
  box.className = "highlight-box";

  const value = document.createElement("strong");
  value.textContent = highlight.value;
  const label = document.createElement("span");
  label.textContent = highlight.label;

  box.append(value, label);
  return box;
}

// Builds the "Previous project / Next project" link.
function createNeighborLink(project, labelText, className) {
  const link = document.createElement("a");
  link.href = "#" + project.id;
  link.className = className;

  const label = document.createElement("small");
  label.textContent = labelText;
  link.append(label, project.title);
  return link;
}

function createProjectPage(project) {
  const page = copyTemplate("project-detail-template");

  page.querySelector(".breadcrumb-current").textContent = project.title;
  page.querySelector(".project-category").textContent = project.category;
  page.querySelector(".project-detail-title").textContent = project.title;
  fillOptionalText(page.querySelector(".project-event"), project.event);
  page.querySelector(".project-description").textContent = project.description;
  fillTagList(page.querySelector(".tag-list"), project.technologies);
  fillImage(page.querySelector(".project-detail-cover"), project);

  // Source and demo buttons appear only when the project has those links.
  const linkRow = page.querySelector(".project-links");
  if (project.githubUrl) {
    linkRow.appendChild(createLinkButton(project.githubUrl, "Source on GitHub", true));
  }
  if (project.liveDemoUrl) {
    linkRow.appendChild(createLinkButton(project.liveDemoUrl, "Live demo", false));
  }
  if (linkRow.children.length === 0) {
    linkRow.remove();
  }

  const highlightGrid = page.querySelector(".highlight-grid");
  if (project.highlights && project.highlights.length > 0) {
    for (const highlight of project.highlights) {
      highlightGrid.appendChild(createHighlightBox(highlight));
    }
  } else {
    highlightGrid.remove();
  }

  const sectionList = page.querySelector(".project-sections");
  for (const section of project.sections || []) {
    sectionList.appendChild(createProjectSection(section));
  }

  // Links to the projects before and after this one in the list.
  const position = PROJECTS.indexOf(project);
  const previous = PROJECTS[position - 1];
  const next = PROJECTS[position + 1];
  const neighborNav = page.querySelector(".prev-next");
  if (previous) {
    neighborNav.appendChild(createNeighborLink(previous, "Previous project", "previous-link"));
  }
  if (next) {
    neighborNav.appendChild(createNeighborLink(next, "Next project", "next-link"));
  }

  return page;
}


/* --------------------------------------------------------------------------
   Switching between the home page and a project page.
   The site is a single HTML file, so the part after "#" in the address
   decides what to show:
     #neopapyrus  -> that project's page
     #about       -> the home page, scrolled to the About section
     (nothing)    -> the home page
   -------------------------------------------------------------------------- */

function showProjectPage(project) {
  // Save the home page position before hiding it (only if it is showing).
  if (!homeView.hidden) {
    savedHomeScroll = window.scrollY;
  }

  projectView.replaceChildren(createProjectPage(project));
  homeView.hidden = true;
  projectView.hidden = false;
  document.title = project.title + " | Pramit Patel";
  window.scrollTo({ top: 0, behavior: "instant" });
  setActiveNavLink("projects");
}

function showHomePage(sectionId) {
  const wasOnProjectPage = !projectView.hidden;

  projectView.hidden = true;
  projectView.replaceChildren();
  homeView.hidden = false;
  document.title = "Pramit Patel | Machine Learning and Software Engineering";

  // The browser cannot scroll to a section while the home page is hidden,
  // so when coming back from a project page we scroll ourselves.
  if (wasOnProjectPage) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "instant" });
    } else {
      window.scrollTo({ top: savedHomeScroll, behavior: "instant" });
    }
  }

  setActiveNavLink(sectionId || "home");
}

// Runs on page load and every time the part after "#" changes.
function handleAddressChange() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  const project = findProject(id);

  if (project) {
    showProjectPage(project);
  } else {
    showHomePage(id);
  }
  closeMenu();
}


/* --------------------------------------------------------------------------
   3. Navigation
   -------------------------------------------------------------------------- */

// Underlines the nav link for the section the visitor is looking at.
function setActiveNavLink(sectionId) {
  for (const link of navLinks.querySelectorAll("a")) {
    const isActive = link.getAttribute("href") === "#" + sectionId;
    link.classList.toggle("is-active", isActive);
  }
}

// Watches the sections while scrolling and updates the active nav link.
// The "rootMargin" means a section counts as current when it crosses the
// middle of the screen.
function watchSectionsWhileScrolling() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !homeView.hidden) {
          setActiveNavLink(entry.target.id);
        }
      }
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  for (const id of SECTION_IDS) {
    observer.observe(document.getElementById(id));
  }
}

// Phone menu: open and close the list of links.
function openMenu() {
  navLinks.classList.add("is-open");
  menuButton.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  navLinks.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  if (navLinks.classList.contains("is-open")) {
    closeMenu();
  } else {
    openMenu();
  }
}

// Clicking a link inside the menu closes it. This also covers clicking the
// link for the section you are already on, where the address does not change.
function closeMenuOnLinkClick(event) {
  if (event.target.closest("a")) {
    closeMenu();
  }
}

// The Escape key closes the menu and puts focus back on the menu button.
function closeMenuOnEscape(event) {
  if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
    closeMenu();
    menuButton.focus();
  }
}

function setFooterYear() {
  document.getElementById("footer-year").textContent = new Date().getFullYear();
}


/* --------------------------------------------------------------------------
   Start everything once the page has loaded
   -------------------------------------------------------------------------- */
renderProjectCards();
setFooterYear();
watchSectionsWhileScrolling();

menuButton.addEventListener("click", toggleMenu);
navLinks.addEventListener("click", closeMenuOnLinkClick);
document.addEventListener("keydown", closeMenuOnEscape);
window.addEventListener("hashchange", handleAddressChange);

handleAddressChange();

// If the page was opened with a section in the address (for example
// /#skills), scroll there now that the project cards have been added above it.
const startSection = document.getElementById(window.location.hash.slice(1));
if (startSection && !homeView.hidden) {
  startSection.scrollIntoView({ behavior: "instant" });
}
