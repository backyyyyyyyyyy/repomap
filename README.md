# 🗺️ repomap

> Generates an interactive visual map of a repository's file structure and dependencies.

[![CI](https://img.shields.io/github/actions/workflow/status/yourusername/repomap/ci.yml?style=for-the-badge)](https://github.com/yourusername/repomap/actions)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](./LICENSE)
[![Codespace Ready](https://img.shields.io/badge/Codespace-Ready-green?style=for-the-badge&logo=github)](https://codespaces.new/yourusername/repomap)

---

## 🚀 What is repomap?

`repomap` scans your repository and generates a rich visual map of its structure — showing file relationships, import dependencies, module sizes, and entry points. Output as ASCII tree, Markdown, JSON, or an interactive HTML report.

```bash
# Map current repo
repomap .

# Map a specific directory
repomap src/ --format markdown

# Show import dependencies
repomap . --deps

# Generate HTML interactive report
repomap . --format html --output report.html

# Filter by file type
repomap . --ext .js .ts
```

---

## ✨ Features

- 🌳 ASCII and Markdown tree output
- 🔗 Import/require dependency tracing
- 📊 File size and line count per node
- 🎯 Entry point detection (index, main, app)
- 🚫 Respects `.gitignore` and `.repomapignore`
- 📄 JSON, Markdown, and HTML export
- 🎨 Color-coded by file type in terminal

---

## 📊 Sample Output

```
repomap src/
🗺️  repomap — src/
├── 📁 api/          [4 files, 312 lines]
│   ├── 📄 routes.js       [89 lines] ← entry
│   ├── 📄 middleware.js   [67 lines]
│   └── 📄 validators.js   [45 lines]
├── 📁 db/           [2 files, 201 lines]
│   ├── 📄 models.js       [134 lines]
│   └── 📄 connect.js      [67 lines]
└── 📄 index.js      [12 lines] ← entry
```

---

## 🏆 GitHub Achievement Scripts

```bash
bash scripts/setup.sh
bash scripts/unlock-all.sh
bash scripts/quickdraw.sh
bash scripts/yolo.sh
bash scripts/publicist.sh
bash scripts/pull-shark.sh 2
bash scripts/pair-extraordinaire.sh "Name" "email@example.com"
node src/achievement-tracker.js
```

---

## 📁 Structure

```
repomap/
├── .devcontainer/devcontainer.json
├── .github/workflows/{ci.yml,release.yml}
├── scripts/{setup,quickdraw,yolo,publicist,pull-shark,pair-extraordinaire,unlock-all}.sh
├── src/{mapper.js,achievement-tracker.js}
├── docs/instructions.md
├── CHANGELOG.md │ CONTRIBUTING.md │ LICENSE │ README.md
```

---

## 🤝 Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) — every PR helps unlock **Pull Shark** 🦈
