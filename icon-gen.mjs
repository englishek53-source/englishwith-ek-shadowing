/* ============================================================
   EnglishWith_EK — App icon generator (pure Node, no deps)
   ------------------------------------------------------------
   Design: "EK الأخضر بموجة صوت"
   - Rounded square, vibrant green vertical gradient (#52b35c → #2f8f46)
   - Bold white "EK" monogram (bitmap glyphs, supersampled 4x)
   - Cream (#F5EBE0) sound-wave bars under the letters (shadowing)
   - Small gold accent dot (playhead / recording)
   Usage:  node icon-gen.mjs            → writes icon-192/512 + apple-touch-icon
           node icon-gen.mjs --preview  → also prints an ASCII preview
   ============================================================ */
import { deflateSync } from "zlib";
import { writeFileSync } from "fs";

/* ---------- pure-Node PNG encoder (RGBA) ---------- */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodePNG(width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0; // filter: none
    raw.set(rgba.subarray(y * width * 4, (y + 1) * width * 4), y * (width * 4 + 1) + 1);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------- design constants (512-unit space) ---------- */
const S = 512;
const GRAD_TOP = [0x57, 0xbd, 0x66]; // #57BD66
const GRAD_BOTTOM = [0x2c, 0x85, 0x41]; // #2C8541
const BORDER = [0x1a, 0x5b, 0x31]; // #1A5B31
const CREAM = [0xf5, 0xeb, 0xe0]; // #F5EBE0
const GOLD = [0xe9, 0xb4, 0x4c]; // #E9B44C
const WHITE = [255, 255, 255];
const SHADOW = [0x0e, 0x38, 0x1e]; // letters drop shadow

/* bold 7×11 bitmap glyphs */
const GLYPH_E = [
  "1111111", "1111111", "1111111", "1100000", "1100000",
  "1111110", "1111110", "1100000", "1100000", "1111111", "1111111",
];
const GLYPH_K = [
  "1100011", "1100011", "1100110", "1101100", "1111000",
  "1110000", "1111000", "1101100", "1100110", "1100011", "1100011",
];

const CELL = 9, GAP = 18, GLYPH_H = 11;
const LETTER_W = 7 * CELL;             // 63
const LETTERS_W = 2 * LETTER_W + GAP;  // 144
const LETTERS_X = (S - LETTERS_W) / 2; // 184
const LETTERS_Y = 118;

const BARS = [44, 78, 116, 78, 44];
const BAR_W = 28, BAR_GAP = 24, WAVE_YC = 360;
const WAVE_X = (S - (5 * BAR_W + 4 * BAR_GAP)) / 2; // 138
const DOT = { x: 400, y: 360, r: 16 };

/* ---------- shape tests (design space, hard coverage) ---------- */
function inRoundRect(px, py, rx, ry, rw, rh, rad) {
  let dx = Math.abs(px - (rx + rw / 2)) - (rw / 2 - rad);
  let dy = Math.abs(py - (ry + rh / 2)) - (rh / 2 - rad);
  if (dx < 0) dx = 0;
  if (dy < 0) dy = 0;
  return dx * dx + dy * dy <= rad * rad;
}
function inCircle(px, py, cx, cy, r) {
  const dx = px - cx, dy = py - cy;
  return dx * dx + dy * dy <= r * r;
}
function glyphOn(px, py) {
  for (let gi = 0; gi < 2; gi++) {
    const gx0 = LETTERS_X + gi * (LETTER_W + GAP);
    const cx = Math.floor((px - gx0) / CELL);
    const cy = Math.floor((py - LETTERS_Y) / CELL);
    if (cx >= 0 && cx < 7 && cy >= 0 && cy < GLYPH_H) {
      const g = gi === 0 ? GLYPH_E : GLYPH_K;
      if (g[cy][cx] === "1") return true;
    }
  }
  return false;
}

/* ---------- render one icon size ---------- */
function render(sizePx) {
  const ss = (sizePx * 4) / S; // supersample pixels per design unit
  const W = sizePx * 4;
  const buf = new Float32Array(W * W * 4); // premultiplied rgba

  for (let i = 0; i < W; i++) {
    const py = i / ss;
    for (let j = 0; j < W; j++) {
      const px = j / ss;

      // background: rounded square with darker green border
      let r, g, b;
      if (inRoundRect(px, py, 0, 0, S, S, 106)) {
        if (inRoundRect(px, py, 9, 9, S - 18, S - 18, 97)) {
          const t = Math.min(1, Math.max(0, py / S));
          r = GRAD_TOP[0] + (GRAD_BOTTOM[0] - GRAD_TOP[0]) * t;
          g = GRAD_TOP[1] + (GRAD_BOTTOM[1] - GRAD_TOP[1]) * t;
          b = GRAD_TOP[2] + (GRAD_BOTTOM[2] - GRAD_TOP[2]) * t;
        } else {
          [r, g, b] = BORDER;
        }
      } else {
        continue; // transparent outside the icon
      }

      // soft light sheen at the top (premium depth)
      const sd = Math.hypot(px - 256, py - 118);
      if (sd < 330) {
        const a = 0.09 * (1 - sd / 330);
        r += (255 - r) * a;
        g += (255 - g) * a;
        b += (255 - b) * a;
      }

      // letters: drop shadow then white EK
      if (glyphOn(px - 5, py - 8)) {
        const a = 0.45;
        r = r * (1 - a) + SHADOW[0] * a;
        g = g * (1 - a) + SHADOW[1] * a;
        b = b * (1 - a) + SHADOW[2] * a;
      }
      if (glyphOn(px, py)) {
        [r, g, b] = WHITE;
      }

      // cream sound wave (capsules)
      for (let bi = 0; bi < 5; bi++) {
        const x = WAVE_X + bi * (BAR_W + BAR_GAP);
        const h = BARS[bi];
        if (inRoundRect(px, py, x, WAVE_YC - h / 2, BAR_W, h, BAR_W / 2)) {
          [r, g, b] = CREAM;
          break;
        }
      }

      // gold accent dot
      if (inCircle(px, py, DOT.x, DOT.y, DOT.r)) {
        [r, g, b] = GOLD;
      }

      const idx = (i * W + j) * 4;
      buf[idx] = r / 255;
      buf[idx + 1] = g / 255;
      buf[idx + 2] = b / 255;
      buf[idx + 3] = 1;
    }
  }

  // box downsample 4x (premultiplied) → final pixels
  const out = new Uint8Array(sizePx * sizePx * 4);
  for (let y = 0; y < sizePx; y++) {
    for (let x = 0; x < sizePx; x++) {
      let pr = 0, pg = 0, pb = 0, pa = 0;
      for (let dy = 0; dy < 4; dy++) {
        for (let dx = 0; dx < 4; dx++) {
          const s = ((y * 4 + dy) * W + (x * 4 + dx)) * 4;
          pr += buf[s]; pg += buf[s + 1]; pb += buf[s + 2]; pa += buf[s + 3];
        }
      }
      const n = 16;
      pr /= n; pg /= n; pb /= n; pa /= n;
      const idx = (y * sizePx + x) * 4;
      out[idx + 3] = Math.round(pa * 255);
      if (pa > 0) {
        out[idx] = Math.round((pr / pa) * 255);
        out[idx + 1] = Math.round((pg / pa) * 255);
        out[idx + 2] = Math.round((pb / pa) * 255);
      }
    }
  }
  return out;
}

/* ---------- ASCII preview (sanity check without a browser) ---------- */
function preview(sizePx, glyphs) {
  const out = render(sizePx);
  const COLS = 56, ROWS = 56;
  const cx = sizePx / COLS, cy = sizePx / ROWS;
  const ch = (r, g, b, a) => {
    if (a < 40) return " ";
    if (r > 230 && g > 230 && b > 200) return "#"; // white letters
    if (Math.abs(r - CREAM[0]) < 40 && Math.abs(g - CREAM[1]) < 40 && Math.abs(b - CREAM[2]) < 40) return "~"; // cream wave
    if (r > 200 && g > 140 && b < 130) return "o"; // gold dot
    return "."; // green bg
  };
  for (let row = 0; row < ROWS; row++) {
    let line = "";
    for (let col = 0; col < COLS; col++) {
      const x = Math.min(sizePx - 1, Math.floor(col * cx));
      const y = Math.min(sizePx - 1, Math.floor(row * cy));
      const idx = (y * sizePx + x) * 4;
      line += ch(out[idx], out[idx + 1], out[idx + 2], out[idx + 3]);
    }
    console.log(line);
  }
}

/* ---------- probe check: verify colors at known points (ground truth) ---------- */
function check() {
  const sizePx = 512;
  const out = render(sizePx);
  const probe = (name, dx, dy) => {
    const x = Math.round(dx), y = Math.round(dy);
    const idx = (y * sizePx + x) * 4;
    console.log(`${name.padEnd(22)} (${x},${y})  rgba(${out[idx]},${out[idx + 1]},${out[idx + 2]},${out[idx + 3]})`);
  };
  probe("corner (transparent)", 4, 4);
  probe("bg gradient top", 256, 60);
  probe("bg gradient bottom", 256, 470);
  probe("E stroke (white)", 197.5, 167.5);
  probe("K stroke (white)", 278.5, 167.5);
  probe("gap between letters (bg)", 256, 167);
  probe("wave middle bar (cream)", 256, 360);
  probe("wave left bar (cream)", 152, 360);
  probe("gold dot", 400, 360);
}

/* ---------- main ---------- */
const sizes = [
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
  { file: "apple-touch-icon.png", size: 180 },
];

if (process.argv.includes("--preview")) {
  preview(192, true);
} else if (process.argv.includes("--check")) {
  check();
} else {
  for (const { file, size } of sizes) {
    const t0 = Date.now();
    const rgba = render(size);
    const png = encodePNG(size, size, rgba);
    writeFileSync(file, png);
    console.log(`✓ ${file}  ${size}×${size}  ${(png.length / 1024).toFixed(1)} KB  (${Date.now() - t0}ms)`);
  }
  console.log("\nDone. Icons written.");
}
