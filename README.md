# Pramit Patel Portfolio

A static portfolio website. No build step and no dependencies.

## Files
- `index.html` contains all the HTML, CSS, JavaScript, and project data.
- `assets/profile.png` is the profile photo.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

## Edit
- Links and resume: the `SITE` object near the top of the script in `index.html`.
- Projects: the `PROJECTS` list. Add an entry and it appears automatically.
- Resume: add `resume.pdf` next to `index.html`, then set `resume:"resume.pdf"` in `SITE`.

## Deploy
GitHub Pages: Settings, Pages, Deploy from a branch, `main`, `/ (root)`.
