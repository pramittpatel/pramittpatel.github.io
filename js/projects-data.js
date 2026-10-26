/* ==========================================================================
   projects-data.js: YOUR PROJECTS. This is the only file you need to edit
   to add, change, or remove a project. js/main.js reads this list and builds
   the project cards and project pages automatically.

   FIELDS FOR EACH PROJECT
   Required:
     id            Short unique name used in the page address, for example
                   "neopapyrus" becomes pramittpatel.github.io/#neopapyrus.
                   Use lowercase letters, numbers and dashes only.
     title         Project name.
     category      One short line shown above the title.
     description   One or two sentences shown on the card and the project page.
     technologies  List of tools you actually used, in quotes, separated by commas.

   Optional (leave out, or use "" for links, and nothing breaks):
     event         Where or when it was built, e.g. "Hacklanta II, October 2026".
     image         Path to a picture, e.g. "assets/projects/my-app.png".
     imageAlt      A short description of the picture for screen readers.
     githubUrl     Link to the source code. No button is shown if empty.
     liveDemoUrl   Link to a live demo. No button is shown if empty.
     highlights    Key numbers. The FIRST one also appears on the card.
                   Format: { value: "0.85+", label: "ROC-AUC score" }
     sections      Headings and text for the project page.
                   Format: { heading: "...", text: "...", bullets: ["...", "..."] }
                   Each section can have text, bullets, or both.

   EXAMPLE (copy this, remove the // at the start of each line, fill it in,
   and paste it into the list below between two existing projects):

   // {
   //   id: "weather-app",
   //   title: "Weather App",
   //   category: "Web Development",
   //   description: "A small web app that shows the forecast for any city.",
   //   technologies: ["JavaScript", "HTML", "CSS"],
   //   githubUrl: "https://github.com/pramittpatel/weather-app",
   //   liveDemoUrl: "",
   //   sections: [
   //     { heading: "What I built", bullets: ["City search", "5-day forecast"] }
   //   ]
   // },

   Remember: every project needs a comma after its closing } brace.
   ========================================================================== */

// ADD NEW PROJECTS HERE: Copy an existing project object, update its details, and save the file.
// Projects appear on the site in the same order as this list.
const PROJECTS = [
  {
    id: "neopapyrus",
    title: "NeoPapyrus",
    category: "Applied AI / Research Tools",
    event: "Hacklonega, October 2026 · team of four",
    description:
      "An AI research assistant that answers questions from peer-reviewed medical papers, cites the exact PDF page, and makes two papers debate a question to surface research gaps.",
    technologies: ["Python", "SQL", "Snowflake Cortex AI", "Next.js", "TypeScript", "Llama 3.3"],
    image: "assets/illustrations/neopapyrus.svg",
    imageAlt: "Illustration of research papers feeding two debating speech bubbles and a balance scale",
    githubUrl: "https://github.com/pramittpatel/NeoPapyrus",
    liveDemoUrl: "",
    highlights: [
      { value: "17", label: "peer-reviewed medical papers" },
      { value: "Page-level", label: "citations back to the source PDF" },
    ],
    sections: [
      {
        heading: "Overview",
        text:
          "Ask a question and NeoPapyrus answers it from a library of medical AI papers, citing the passages it used and opening the real PDF on the right page. Its paper-debate feature picks two papers, has each side argue only from its own text, and then rules on where they agree, how recent the evidence is, and which research gaps neither paper fills.",
      },
      {
        heading: "What I built",
        bullets: [
          "Co-built the research assistant that answers questions from 17 peer-reviewed medical papers, citing the exact PDF page.",
          "Engineered a Snowflake pipeline that reads PDFs page by page and splits them into searchable passages.",
          "Built the paper-debate feature, where an AI model argues two papers and then rules on agreement, recency, and research gaps.",
        ],
      },
      {
        heading: "How it works",
        text:
          "The papers, parsing, embeddings, search, and language model all run inside one Snowflake account. A Next.js web app talks to Snowflake from the server, so credentials never reach the browser.",
      },
    ],
  },
  {
    id: "aurabeat",
    title: "AuraBeat",
    category: "Accessibility Technology / Applied AI",
    event: "Hacklanta II, October 2026 · team project",
    description:
      "A watchOS app that turns live audio into haptic feedback and reads wrist gestures, with a voice assistant, built to make live events more accessible for hearing-impaired people.",
    technologies: ["React", "TypeScript", "watchOS", "Python", "ElevenLabs API"],
    image: "assets/illustrations/aurabeat.svg",
    imageAlt: "Illustration of a smartwatch sending out haptic pulses next to an audio waveform",
    githubUrl: "https://github.com/treovivu/AuraBeat",
    liveDemoUrl: "",
    highlights: [
      { value: "36 hrs", label: "hackathon build" },
      { value: "60 Hz", label: "wrist gesture capture" },
      { value: "250+", label: "student teams in the field" },
    ],
    sections: [
      {
        heading: "The problem",
        text:
          "Live events are built around sound, which leaves people with hearing impairments with less of the experience.",
      },
      {
        heading: "What I built",
        bullets: [
          "Developed a watchOS app in 36 hours that captures wrist gestures at 60 Hz and returns haptic feedback synced to live audio.",
          "Integrated an ElevenLabs voice assistant through a Python backend, with 4 sensory toggles for hearing-impaired users.",
          "Co-engineered and pitched a working end-to-end prototype to 20+ judges in a field of 250+ student teams.",
        ],
      },
    ],
  },
  {
    id: "car-insurance-claim-prediction",
    title: "Car Insurance Claim Prediction",
    category: "Machine Learning / Predictive Modeling",
    description:
      "An end-to-end classification pipeline that predicts the probability of an insurance claim from structured customer records.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    image: "assets/illustrations/car-insurance.svg",
    imageAlt: "Illustration of a data table flowing into decision trees and a gauge",
    githubUrl: "",
    liveDemoUrl: "",
    highlights: [
      { value: "0.85+", label: "ROC-AUC score" },
      { value: "10,000+", label: "structured records" },
      { value: "15+", label: "features prepared" },
    ],
    sections: [
      {
        heading: "The problem",
        text:
          "Claims are much rarer than non-claims, so a model can look accurate while missing most of them. The pipeline is evaluated with ROC-AUC and precision-recall instead of accuracy alone.",
      },
      {
        heading: "What I built",
        bullets: [
          "Built an end-to-end Scikit-learn pipeline that predicts claim probability from 10,000+ structured records.",
          "Imputed missing values, one-hot encoded categorical variables, and scaled 15+ features.",
          "Trained a class-weighted Random Forest that reached a 0.85+ ROC-AUC score, validated with precision-recall analysis.",
        ],
      },
    ],
  },
  {
    id: "voice-activated-ai-assistant",
    title: "Voice-Activated AI Assistant",
    category: "Applied AI / Voice Interfaces",
    description:
      "A hands-free desktop assistant that listens, transcribes speech with Whisper, and answers out loud.",
    technologies: ["Python", "OpenAI API", "Whisper", "Pyttsx3", "SoundDevice"],
    image: "assets/illustrations/voice-assistant.svg",
    imageAlt: "Illustration of a microphone, a sound wave, and a reply speech bubble",
    githubUrl: "",
    liveDemoUrl: "",
    highlights: [
      { value: "< 2 s", label: "transcription latency" },
      { value: "16 kHz", label: "real-time audio capture" },
      { value: "4", label: "modular Python scripts" },
    ],
    sections: [
      {
        heading: "How it works",
        bullets: [
          "Audio capture: real-time input at 16 kHz with SoundDevice.",
          "Speech recognition: OpenAI's Whisper model, with under 2-second latency.",
          "Response: generated with the OpenAI API.",
          "Spoken reply: Pyttsx3 text-to-speech.",
        ],
      },
      {
        heading: "Code structure",
        text:
          "The assistant is split into 4 modular Python scripts, with custom exception handling for API calls, speech recognition, and response generation.",
      },
    ],
  },
];
