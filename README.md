# Pramit Patel Portfolio

My personal portfolio, live at **https://pramittpatel.github.io/**.

It is a plain static website: HTML, CSS and JavaScript files, with no
framework, no build step, and nothing to install. GitHub Pages serves the
files exactly as they are in this repository.

## Files

```
index.html              Page structure and most of the text (intro, about, experience, skills, contact)
css/styles.css          How everything looks: colors, fonts, layout, phone sizes
js/projects-data.js     YOUR PROJECTS: one entry per project
js/main.js              Builds the project cards and pages, runs the navigation menu
js/effects.js           Optional animations (hero network, count-up, card tilt, slide-ins)
assets/resume.pdf       The resume visitors open and download
assets/profile.png      Profile photo
assets/favicon.svg      Little icon shown in the browser tab
assets/illustrations/   Drawings used as project cover images
```

How the pieces fit together:

- **HTML** says *what* is on the page. For example, `<section id="skills">` is the Skills section.
- **CSS** says *how it looks*. For example, `.skill-group { padding: 24px; }` gives each skill box its spacing.
- **JavaScript** adds *behavior*. `main.js` reads the `PROJECTS` list from
  `projects-data.js` and copies the card layout from the
  `<template id="project-card-template">` at the bottom of `index.html` once
  for every project.

There is no server-side backend. GitHub Pages can only host files, so the
"data" side of this site is `js/projects-data.js` and the files in `assets/`.

---

## How to Update Your Portfolio

Before you start, open a terminal in this folder and run the site locally
(see **8. Test your changes locally**), so you can see each change as you make it.

### 1. Add a project

- **Open:** `js/projects-data.js`
- **Search for:** `ADD NEW PROJECTS HERE`
- **Do this:** Copy one whole project, from its opening `{` to its closing `},`.
  Paste it where you want it in the list (the site shows projects in list
  order), then change the values inside the quotes.

A real example: adding a project with only a GitHub link and no picture:

```js
  {
    id: "stock-price-forecasting",
    title: "Stock Price Forecasting",
    category: "Machine Learning / Time Series",
    description: "An LSTM model that forecasts next-day closing prices from historical data.",
    technologies: ["Python", "PyTorch", "Pandas"],
    githubUrl: "https://github.com/pramittpatel/stock-price-forecasting",
    sections: [
      { heading: "What I built", bullets: ["Data pipeline for daily prices", "LSTM model and evaluation"] },
    ],
  },
```

(This is only an example of the format. It is not one of your projects.)

- **Required fields:** `id`, `title`, `category`, `description`, `technologies`.
- **Optional fields:** `event`, `image`, `imageAlt`, `githubUrl`, `liveDemoUrl`,
  `highlights`, `sections`. If you leave one out, that part is simply not shown:
  no empty buttons and no broken images.
- **Avoid:** using the same `id` twice, spaces or capital letters in the `id`,
  and forgetting the comma after the closing `}`.
- **Check:** reload the page. The new card should appear, and clicking it
  should open its page.

### 2. Edit or remove a project

- **Open:** `js/projects-data.js`
- **Search for:** the project's title, e.g. `AuraBeat`
- **To edit:** change the text inside the quotes.
- **To remove:** delete everything from that project's `{` to its `},`.
- **Avoid:** deleting the `[` at the top of the list or the `];` at the bottom.
- **Check:** reload the page. If *all* project cards disappear, there is a
  typing mistake (usually a missing comma or quote). Press F12 and open the
  Console tab: it shows the line number of the problem.

### 3. Replace the resume PDF

1. Export your updated resume from Word as a PDF (File → Save As → PDF).
2. Rename it to exactly `resume.pdf`.
3. Replace the old `assets/resume.pdf` with the new file.
4. Test it locally: click **Resume** in the header and **Download resume (PDF)** in the Contact section.
5. Commit and push the new file (see **9. Publish**).

You do not need to change any code. All three resume links point to
`assets/resume.pdf`. Keep the filename the same.

> The website copy of the resume has the phone number removed for privacy.
> If you want to do the same with a future resume, delete the phone number
> in a copy of the Word file before exporting the PDF.

### 4. Update personal information

All in `index.html`. Search for these comments:

| What                         | Search for                         |
|------------------------------|------------------------------------|
| Name, headline, intro        | `EDIT YOUR INTRODUCTION HERE`      |
| About-me paragraphs          | `EDIT YOUR ABOUT-ME TEXT HERE`     |
| Degree, GPA, graduation      | `ADD OR UPDATE YOUR EDUCATION HERE`|
| GitHub, LinkedIn, email      | `UPDATE YOUR CONTACT LINKS HERE` (there are two: hero icons and Contact buttons) |
| The numbers under the intro  | `STATS`                            |
| Photo                        | replace `assets/profile.png` (square image) |

- **Avoid:** deleting the `<` `>` tags around the text. Only change the words
  between them.
- **Stats:** if you change a number, change both the visible text and the
  `data-count-to="..."` value next to it (that is where the count-up
  animation stops).
- **Search results and link previews:** the `<title>` and `<meta ... description>`
  lines at the top of `index.html`.

### 5. Update skills and experience

- **Open:** `index.html`
- **Skills:** search for `UPDATE YOUR SKILLS HERE`. Each skill is one
  `<li>Skill</li>`. To add a whole group, copy one `<div class="skill-group">…</div>` block.
- **Experience:** search for `UPDATE YOUR EXPERIENCE HERE`. Each role is one
  `<article class="job">…</article>` block. Copy one, paste it at the top for
  a newer role, and change the dates, title, place and bullet points.
- **Check:** reload and look at the Skills and Experience sections on both a
  wide window and a narrow one.

### 6. Change colors and typography

- **Open:** `css/styles.css`
- **Search for:** `EASY CUSTOMIZATION`
- **Accent color:** change `--color-accent` (and `--color-accent-hover` to a
  slightly lighter version). Buttons, links, highlights, the photo rings and
  the hero network animation all follow it.
- **Background/text:** `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`.
- **Fonts:** change `--font-main` / `--font-mono`. If you use a different
  Google Font, also update the `fonts.googleapis.com` link in the `<head>` of `index.html`.
- **Avoid:** renaming the variables (the part starting with `--`). Change only the value after the colon.
- **Note:** the project illustrations in `assets/illustrations/` and
  `assets/favicon.svg` are separate image files with their own colors
  written inside them, so they do not change with the accent color.

### 7. Add project screenshots

1. Save the screenshot in a new folder `assets/projects/`, e.g. `assets/projects/neopapyrus.png`.
   A 16:9 image (like 1600×900) fits the card best.
2. In `js/projects-data.js`, change that project's `image` to the new path:
   `image: "assets/projects/neopapyrus.png",`
3. Update `imageAlt` to describe what the screenshot shows, e.g.
   `imageAlt: "NeoPapyrus answer page with citations next to the source PDF",`
4. **Check:** the picture appears on the card and on the project page.
   File names are case-sensitive on GitHub Pages: `Shot.PNG` and `shot.png` are different files.

### 8. Test your changes locally

Open a terminal in this folder and run:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000 in your browser. After each change, save the
file and reload the page (use Ctrl+Shift+R if you don't see the change; it
skips the browser's saved copy). Press Ctrl+C in the terminal to stop the server.

Quick checklist:
- Every nav link scrolls to its section, including from a project page.
- Every project card opens its page, and "Back to all projects" returns.
- The Resume buttons open/download the PDF.
- Make the window narrow (or press F12 → device toolbar) to check the phone layout and menu.
- Press F12 → Console: there should be no red errors.

### 9. Publish to GitHub Pages

```bash
git status
```

```bash
git add -A
```

```bash
git commit -m "Describe your change"
```

```bash
git push
```

GitHub Pages rebuilds the site within a minute or two. In the repository
settings it is set to: Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
Check https://pramittpatel.github.io/ afterwards (Ctrl+Shift+R to skip the cache).
