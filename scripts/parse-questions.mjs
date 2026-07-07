// 题库 md → JSON 解析器
// 输入: 面试复习每日练习.md 的「题库」部分
// 输出: src/data/questions.json
//
// 用法: node scripts/parse-questions.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MD_PATH = resolve(__dirname, '../source/questions-source.md');
const OUT_PATH = resolve(__dirname, '../src/data/questions.json');

// ---------- 分段 ----------
function extractLibrarySection(md) {
  const startMatch = /^## +题库/m.exec(md);
  if (!startMatch) throw new Error('找不到 ## 题库 段落');
  const rest = md.slice(startMatch.index + startMatch[0].length);
  const nextH2 = /^## +/m.exec(rest);
  return nextH2 ? rest.slice(0, nextH2.index) : rest;
}

function splitDayBlocks(md) {
  const lines = md.split('\n');
  const blocks = [];
  let cur = null;
  for (const line of lines) {
    const m = line.match(/^### +Day\s*(\d+(?:\.\d+)?)\s*[—\-–]\s*(.+?)\s*$/);
    if (m) {
      cur = { day: Number(m[1]), title: m[2].trim(), body: [] };
      blocks.push(cur);
    } else if (cur) {
      cur.body.push(line);
    }
  }
  return blocks;
}

function splitByType(dayBody) {
  const sections = { choice: [], fill: [], short: [] };
  let cur = null;
  for (const line of dayBody) {
    const m = line.match(/^####\s+(.+?)\s*$/);
    if (m) {
      const t = m[1];
      if (/选择/.test(t)) cur = 'choice';
      else if (/填空/.test(t)) cur = 'fill';
      else if (/简答/.test(t)) cur = 'short';
      else cur = null;
    } else if (cur) {
      sections[cur].push(line);
    }
  }
  return sections;
}

// ---------- 切题 ----------
function splitItems(text) {
  const re = /(?:-\s+`\[(D\d+(?:\.\d+)?-\d+)\]`\s*|\*\*(D\d+(?:\.\d+)?-\d+)\*\*\s*)([\s\S]*?)(?=\n(?:-\s+`\[D\d+(?:\.\d+)?-\d+\]`\s|\*\*D\d+(?:\.\d+)?-\d+\*\*)|\n####\s|\n###\s|\n##\s|$)/g;
  const items = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    items.push({ id: m[1] ?? m[2], content: m[3].trim() });
  }
  return items;
}

// ---------- 单题解析 ----------
function parseOptions(text) {
  // 选项区域起点：第一个 X. 模式
  const startIdx = text.search(/[A-D]\.\s/);
  if (startIdx === -1) return [];
  const block = text.slice(startIdx);
  // 按 " / " 或换行切
  const segs = block.split(/\s*\/\s*|\n+/);
  const opts = [];
  for (const seg of segs) {
    const m = seg.match(/^([A-D])\.\s*(.+)$/);
    if (m) opts.push({ key: m[1], text: m[2].trim() });
  }
  return opts;
}

function parseChoice(id, content) {
  // 分离答案（最后一个 →）
  const arrowIdx = content.lastIndexOf('→');
  let stemPart = content;
  let answerPart = null;
  if (arrowIdx !== -1) {
    stemPart = content.slice(0, arrowIdx);
    answerPart = content.slice(arrowIdx + 1).trim();
  }

  const options = parseOptions(stemPart);
  let stem = stemPart;
  if (options.length > 0) {
    const firstOpt = stemPart.search(/[A-D]\.\s/);
    if (firstOpt !== -1) stem = stemPart.slice(0, firstOpt);
  }
  stem = stem.replace(/\s+/g, ' ').trim();

  let answer = null;
  let explanation = null;
  if (answerPart) {
    const am = answerPart.match(/^([A-D])\s*[（(]([\s\S]*?)[)）]\s*$/);
    if (am) {
      answer = am[1];
      explanation = am[2].trim();
    } else {
      const am2 = answerPart.match(/^([A-D])/);
      if (am2) answer = am2[1];
    }
  }
  return {
    id, type: 'choice',
    stem, options, answer, explanation,
    incomplete: options.length === 0, // 缺选项 → App 里降级为对照模式
  };
}

function parseFill(id, content) {
  const arrowIdx = content.lastIndexOf('→');
  let stemPart = content;
  let answerPart = null;
  if (arrowIdx !== -1) {
    stemPart = content.slice(0, arrowIdx);
    answerPart = content.slice(arrowIdx + 1).trim();
  }
  // 2 个及以上下划线(带可选反斜杠转义) → 统一占位符 ___
  const stem = stemPart.replace(/(?:\\?_){2,}/g, '___').replace(/\s+/g, ' ').trim();
  let blanks = null;
  if (answerPart) {
    blanks = answerPart.split(/\s*\/\s*/).map(s => s.trim()).filter(Boolean);
  }
  return { id, type: 'fill', stem, blanks };
}

function parseShort(id, content) {
  const lines = content.split('\n');
  const stemLines = [];
  const answerLines = [];
  let inAnswer = false;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('>')) {
      inAnswer = true;
      answerLines.push(t.replace(/^>\s?/, ''));
    } else if (!inAnswer && t) {
      stemLines.push(t);
    }
  }
  return {
    id, type: 'short',
    stem: stemLines.join(' ').replace(/\s+/g, ' ').trim(),
    answer: answerLines.join('\n').trim() || null,
  };
}

function parseSeq(id) {
  return Number(id.split('-')[1]);
}

// ---------- 主流程 ----------
function parse(md) {
  const libMd = extractLibrarySection(md);
  const dayBlocks = splitDayBlocks(libMd);
  const questions = [];
  const failures = [];

  for (const blk of dayBlocks) {
    const sections = splitByType(blk.body);
    for (const [type, lines] of Object.entries(sections)) {
      const text = lines.join('\n');
      const items = splitItems(text);
      for (const it of items) {
        try {
          let q;
          if (type === 'choice') q = parseChoice(it.id, it.content);
          else if (type === 'fill') q = parseFill(it.id, it.content);
          else q = parseShort(it.id, it.content);
          q.day = blk.day;
          q.category = blk.title;
          q.seq = parseSeq(it.id);
          questions.push(q);
        } catch (e) {
          failures.push({ id: it.id, error: e.message, content: it.content });
        }
      }
    }
  }
  return { questions, failures };
}

// ---------- 运行 ----------
const md = readFileSync(MD_PATH, 'utf-8');
const { questions, failures } = parse(md);

// 按 id 排序
questions.sort((a, b) => {
  const [da, sa] = a.id.slice(1).split('-').map(Number);
  const [db, sb] = b.id.slice(1).split('-').map(Number);
  return da - db || sa - sb;
});

const byType = { choice: 0, fill: 0, short: 0 };
const incomplete = [];
for (const q of questions) {
  byType[q.type]++;
  if (q.type === 'choice' && q.incomplete) incomplete.push(q.id);
}

const output = {
  generatedAt: new Date().toISOString(),
  source: '面试复习每日练习.md (source/questions-source.md)',
  total: questions.length,
  byType,
  questions,
};

writeFileSync(OUT_PATH, JSON.stringify(output, null, 2), 'utf-8');

console.log('✅ 解析完成');
console.log(`   总题数: ${questions.length}`);
console.log(`   选择: ${byType.choice}  填空: ${byType.fill}  简答: ${byType.short}`);
console.log(`   选择题缺选项(降级为对照模式): ${incomplete.length}  → ${incomplete.join(', ')}`);
console.log(`   解析失败: ${failures.length}`);
if (failures.length) {
  for (const f of failures) console.log(`     ❌ ${f.id}: ${f.error}`);
}
console.log(`   输出: ${OUT_PATH}`);
