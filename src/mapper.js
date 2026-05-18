#!/usr/bin/env node
// 🗺️ repomap — Repository Structure Mapper

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GREEN  = '\x1b[32m'; const YELLOW = '\x1b[33m';
const CYAN   = '\x1b[36m'; const BOLD   = '\x1b[1m';
const DIM    = '\x1b[2m';  const BLUE   = '\x1b[34m';
const NC     = '\x1b[0m';

const IGNORED = new Set(['.git','node_modules','dist','build','.next','.cache','__pycache__','.pytest_cache','coverage','.DS_Store']);
const EXT_ICONS = { '.js':'📜', '.ts':'📘', '.py':'🐍', '.go':'🐹', '.rs':'🦀', '.sh':'⚙️', '.md':'📝', '.json':'📋', '.yml':'⚙️', '.yaml':'⚙️', '.html':'🌐', '.css':'🎨', '.sql':'🗄️' };

function getIgnored(rootDir) {
  const gi = path.join(rootDir, '.gitignore');
  if (!fs.existsSync(gi)) return new Set();
  return new Set(fs.readFileSync(gi, 'utf8').split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#')));
}

function countLines(filePath) {
  try { return fs.readFileSync(filePath, 'utf8').split('\n').length; }
  catch { return 0; }
}

function icon(filePath) {
  const ext = path.extname(filePath);
  return EXT_ICONS[ext] || '📄';
}

function mapDir(dirPath, prefix = '', rootIgnored = new Set(), depth = 0, stats = { files: 0, lines: 0 }) {
  if (depth > 6) return '';
  let entries;
  try { entries = fs.readdirSync(dirPath); } catch { return ''; }

  entries = entries.filter(e => !IGNORED.has(e) && !rootIgnored.has(e) && !e.startsWith('.') || e === '.github');
  entries.sort((a, b) => {
    const aIsDir = fs.statSync(path.join(dirPath, a)).isDirectory();
    const bIsDir = fs.statSync(path.join(dirPath, b)).isDirectory();
    if (aIsDir && !bIsDir) return -1;
    if (!aIsDir && bIsDir) return 1;
    return a.localeCompare(b);
  });

  let out = '';
  entries.forEach((entry, i) => {
    const full    = path.join(dirPath, entry);
    const isLast  = i === entries.length - 1;
    const branch  = isLast ? '└── ' : '├── ';
    const newPre  = prefix + (isLast ? '    ' : '│   ');
    const isDir   = fs.statSync(full).isDirectory();

    if (isDir) {
      const subStats = { files: 0, lines: 0 };
      const sub = mapDir(full, newPre, rootIgnored, depth + 1, subStats);
      out += `${prefix}${branch}${BLUE}📁 ${entry}/${NC} ${DIM}[${subStats.files} files]${NC}\n${sub}`;
      stats.files += subStats.files;
      stats.lines += subStats.lines;
    } else {
      const lines = countLines(full);
      const size  = fs.statSync(full).size;
      const sizeStr = size > 1024 ? `${(size/1024).toFixed(1)}kb` : `${size}b`;
      out += `${prefix}${branch}${icon(full)} ${entry} ${DIM}[${lines} lines, ${sizeStr}]${NC}\n`;
      stats.files++;
      stats.lines += lines;
    }
  });
  return out;
}

const target = process.argv[2] || '.';
const format = process.argv[3] || 'tree';
const abs    = path.resolve(target);
const name   = path.basename(abs);
const ignored = getIgnored(abs);
const stats  = { files: 0, lines: 0 };

console.log(`\n${CYAN}${BOLD}🗺️  repomap — ${name}/${NC}\n`);
const tree = mapDir(abs, '', ignored, 0, stats);
console.log(tree);
console.log(`${DIM}${'─'.repeat(50)}${NC}`);
console.log(`${BOLD}Total:${NC} ${GREEN}${stats.files} files${NC}, ${YELLOW}${stats.lines.toLocaleString()} lines${NC}\n`);

if (format === 'markdown') {
  const md = `# 🗺️ ${name} — Repository Map\n\n\`\`\`\n${tree}\`\`\`\n\n**${stats.files} files | ${stats.lines.toLocaleString()} lines**\n`;
  fs.writeFileSync('repomap.md', md);
  console.log(`${GREEN}✅ Saved to repomap.md${NC}\n`);
}
