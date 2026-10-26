# Maintenance Guide

How to update this portfolio by hand. Every change is a small edit to one
file. There is nothing to install and no build step.

## Contents

1. [How the site is put together](#1-how-the-site-is-put-together)
2. [Add a project](#2-add-a-project)
3. [Edit or remove a project](#3-edit-or-remove-a-project)
4. [Add project screenshots](#4-add-project-screenshots)
5. [Replace the resume PDF](#5-replace-the-resume-pdf)
6. [Edit your information](#6-edit-your-information)
7. [Update skills and experience](#7-update-skills-and-experience)
8. [Change colors and fonts](#8-change-colors-and-fonts)
9. [Test locally](#9-test-locally)
10. [Publish to GitHub Pages](#10-publish-to-github-pages)

---

## 1. How the site is put together

| File | What it does | Edit it to change |
|---|---|---|
| `index.html` | Page structure and most of the text | Intro, about, education, stats, experience, skills, contact links |
| `css/styles.css` | All styling | Colors, fonts, spacing, layout |
| `js/projects-data.js` | The list of projects | Projects and their links |
| `js/main.js` | Builds project cards and pages, runs the navigation | Rarely needed |
| `js/effects.js` | Optional animations | Rarely needed. Deleting it (and its `<script>` tag) turns animations off; the site still works |
| `assets/resume.pdf` | The resume visitors open and download | Replace the file |
| `assets/profile.png` | Profile photo | Replace the file |
| `assets/favicon.svg` | Browser tab icon | Replace the file |
| `assets/illustrations/` | Project cover drawings | Add or replace SVG files |

How the pieces connect:

- **HTML** decides *what* is on the page. `<section id="skills">` is the Skills section.
- **CSS** decides *how it looks*. `.skill-group { padding: 24px; }` spaces each skill box.
- **JavaScript** adds *behavior*. `main.js` reads the `PROJECTS` list in
  `projects-data.js` and, for each project, copies the layout inside
  `<template id="project-card-template">` (bottom of `index.html`) and fills it in.

Editing comments in the code mark the places you are expected to change.
Search for them with Ctrl+F in your editor.

---

## 2. Add a project

- **Open:** `js/projects-data.js`
- **Search for:** `ADD NEW PROJECTS HERE`
- **Do this:** copy one whole project, from its opening `{` to its closing `},`,
  paste it where you want it in the list, and change the values inside the quotes.
  Projects appear on the site in list order.

Example of the format (placeholder values, replace all of them):

```js
  {
    id: "my-new-project",
    title: "My New Project",
    category: "Machine Learning",
    description: "One or two sentences about what it does.",
    technologies: ["Python", "Pandas"],
    githubUrl: "https://github.com/pramittpatel/your-repo-name",
    sections: [
      { heading: "What I built", bullets: ["First thing", "Second thing"] },
    ],
  },
```

**Required fields:** `id`, `title`, `category`, `description`, `technologies`.

**Optional fields:** `event`, `image`, `imageAlt`, `githubUrl`, `liveDemoUrl`,
`highlights`, `sections`. Leave any of them out and that part is simply not
shown. You won't get empty buttons or broken images.

| Field | Example | Notes |
|---|---|---|
| `id` | `"my-new-project"` | Becomes the page address `/#my-new-project`. Lowercase letters, numbers and dashes only. Must be unique. |
| `event` | `"Hackathon name, Month Year"` | Small line under the title |
| `image` / `imageAlt` | `"assets/projects/app.png"` / `"Home screen of the app"` | See section 4 |
| `githubUrl` / `liveDemoUrl` | `"https://..."` | A button appears only when filled in |
| `highlights` | `[{ value: "0.85+", label: "ROC-AUC score" }]` | The first one also appears on the card |
| `sections` | `[{ heading: "...", text: "...", bullets: ["..."] }]` | Each section can have `text`, `bullets`, or both |

**Avoid:** reusing an `id`, spaces or capitals in an `id`, forgetting the
comma after the closing `}`, and adding a project with a link that does not
exist yet.

**Check:** reload the page. The new card appears, clicking it opens its page,
and the Previous/Next links at the bottom of project pages include it.

---

## 3. Edit or remove a project

- **Open:** `js/projects-data.js`
- **Search for:** the project's title, for example `AuraBeat`.
- **Edit:** change the text inside the quotes.
- **Remove:** delete everything from that project's `{` to its `},`.
- **Avoid:** deleting the `[` that starts the list or the `];` that ends it.
- **Check:** reload the page. If *all* project cards disappear, there is a
  typing mistake, usually a missing comma or quote. Press F12 and open the
  **Console** tab; the red error message names the file and line number.

---

## 4. Add project screenshots

1. Create a folder `assets/projects/` if it does not exist, and save the image
   there, for example `assets/projects/neopapyrus.png`. A 16:9 image
   (such as 1600×900) fits the card best.
2. In `js/projects-data.js`, set that project's `image` to the new path:
   `image: "assets/projects/neopapyrus.png",`
3. Set `imageAlt` to a short description of what the image shows.
4. **Check:** the image appears on the card and on the project page.

File names are case-sensitive on GitHub Pages, so `Shot.PNG` and `shot.png`
are different files. Keep names lowercase.

---

## 5. Replace the resume PDF

1. Export the updated resume as a PDF (in Word: File → Save As → PDF).
   Before exporting, remove anything you don't want public, such as a
   phone number or home address. The PDF is downloadable by anyone.
2. Name the file exactly `resume.pdf`.
3. Replace the old `assets/resume.pdf` with it.
4. Test locally (section 9): click **Resume** in the header, **View resume**
   in the intro, and **Download resume (PDF)** in the Contact section.
5. Publish (section 10).

No code changes are needed. All three links point to `assets/resume.pdf`.
In `index.html`, search for `TO UPDATE YOUR RESUME` to see the header link.

---

## 6. Edit your information

All of these are in `index.html`. Search for the comment, then edit the text
right below it.

| What | Search for |
|---|---|
| Name, headline, intro paragraph | `EDIT YOUR INTRODUCTION HERE` |
| About paragraphs | `EDIT YOUR ABOUT-ME TEXT HERE` |
| Degree, GPA, graduation date | `ADD OR UPDATE YOUR EDUCATION HERE` |
| GitHub, LinkedIn, email | `UPDATE YOUR CONTACT LINKS HERE` (two places: the icons in the intro and the buttons in Contact) |
| Numbers under the intro | `STATS` |
| Page title and search description | `<title>` and `name="description"` at the top of the file |
| Profile photo | Replace `assets/profile.png` with a square image of the same name |

**Stats:** each number appears twice: as the visible text and as
`data-count-to="..."` (where the count-up animation stops). Change both.
`data-decimals="1"` shows one decimal place, and `data-suffix="+"` adds a `+`.

**Avoid:** deleting the `<` `>` tags around text. Change only the words between them.

**Check:** reload and read through each section you changed.

---

## 7. Update skills and experience

- **Open:** `index.html`
- **Skills:** search for `UPDATE YOUR SKILLS HERE`. Each skill is one
  `<li>Skill name</li>`. To add a group, copy a whole
  `<div class="skill-group">…</div>` block and change its heading and items.
- **Experience:** search for `UPDATE YOUR EXPERIENCE HERE`. Each role is one
  `<article class="job">…</article>` block. Copy one, paste it above the others
  for a newer role, and change the dates, title, place and bullet points.
- **Check:** reload and look at both sections in a wide window and a narrow one.

---

## 8. Change colors and fonts

- **Open:** `css/styles.css`
- **Search for:** `EASY CUSTOMIZATION`

| Variable | Controls |
|---|---|
| `--color-accent` | Buttons, links, highlights, photo rings, hero network animation |
| `--color-accent-hover` | Button hover color (use a slightly lighter accent) |
| `--color-bg` | Page background |
| `--color-surface` | Cards and alternate section backgrounds |
| `--color-text` / `--color-muted` | Main text / secondary text |
| `--font-main` / `--font-mono` | Fonts |
| `--content-width` | Maximum width of the page content |

- **Fonts:** if you switch to a different Google Font, also update the
  `fonts.googleapis.com` link in the `<head>` of `index.html`.
- **Avoid:** renaming variables (the part starting with `--`). Change only the value after the colon.
- **Note:** `assets/illustrations/*.svg` and `assets/favicon.svg` have their
  own colors written inside them, so they do not follow `--color-accent`.

---

## 9. Test locally

Open a terminal in this folder and start a local server
(Python is required; any Python 3 version works):

```bash
python -m http.server 8000
```

Visit http://localhost:8000. After each change, save the file and reload the
page. Press Ctrl+Shift+R if the change doesn't appear; that skips the
browser's saved copy. Press Ctrl+C in the terminal to stop the server.

Checklist:

- Every nav link scrolls to its section, including when clicked from a project page.
- Every project card opens its page, and **Back to all projects** returns.
- The resume links open and download the PDF.
- A narrow window (or F12 → device toolbar) shows the phone layout, and the menu button opens and closes.
- F12 → Console shows no red errors.

---

## 10. Publish to GitHub Pages

Review what changed first:

```bash
git status
```

```bash
git diff
```

If everything in `git status` should be published, stage it all (to stage
only some files, list them instead, for example `git add index.html`):

```bash
git add -A
```

Commit with a short description, then push:

```bash
git commit -m "Describe your change"
```

```bash
git push
```

GitHub Pages updates the live site a minute or two after the push. Then
check https://pramittpatel.github.io/ (Ctrl+Shift+R to skip the cache).

If the site doesn't update, open the repository on GitHub and check
**Settings → Pages**. The source should be **Deploy from a branch**, branch
`main`, folder `/ (root)`, because `index.html` is at the root of this repository.
