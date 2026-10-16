// Renders a shareable result card on-brand with the synthwave "Estus Health"
// identity: deep-purple night palette, Bungee wordmark, teal -> mauve accents,
// and the signature synthwave sun. Fonts (Bungee / Archivo Black / Poppins)
// are loaded globally via Google Fonts in index.html; we await them here so
// the canvas draws with the real brand type rather than a system fallback.

const TEAL = '#1ce8f0';
const MAUVE = '#ff2e9a';
const CREAM = '#ece4ff';
const SOFT = '#a99fd6';

// Ensure the brand webfonts are rasterised before we paint to the canvas.
async function ensureFonts() {
  if (!document.fonts || !document.fonts.load) return;
  try {
    await Promise.all([
      document.fonts.load('400 40px "Bungee"'),
      document.fonts.load('400 46px "Archivo Black"'),
      document.fonts.load('italic 400 24px "Poppins"'),
      document.fonts.load('600 16px "Poppins"'),
    ]);
  } catch (e) {
    /* fall through to whatever is available */
  }
}

// The retro sun: a teal -> mauve disc with horizontal gaps across its lower half.
function drawSun(ctx, cx, cy, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  const g = ctx.createLinearGradient(0, cy - r, 0, cy + r);
  g.addColorStop(0, TEAL);
  g.addColorStop(0.5, '#7b4bd0');
  g.addColorStop(1, MAUVE);
  ctx.fillStyle = g;
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

  // Punch transparent bands through the lower half to reveal the background.
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = '#000';
  [[0.54, 5], [0.62, 7], [0.71, 9], [0.81, 12], [0.93, 16]].forEach(([f, h]) => {
    ctx.fillRect(cx - r, cy - r + f * (2 * r), r * 2, h);
  });
  ctx.restore();
}

// Shrink a font until the text fits within maxWidth (keeps long archetype
// names on one line without overflowing the card).
function fitFont(ctx, text, family, startPx, maxWidth) {
  let size = startPx;
  ctx.font = `400 ${size}px ${family}`;
  while (ctx.measureText(text).width > maxWidth && size > 24) {
    size -= 2;
    ctx.font = `400 ${size}px ${family}`;
  }
  return size;
}

export async function generateShareImage({
  quizName,
  archetypeName,
  archetypeEmoji,
  archetypeSubtitle,
  quizSlug,
  archetypeSlug,
}) {
  await ensureFonts();

  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');

  // Deep-purple night background.
  const bg = ctx.createLinearGradient(0, 0, 1200, 630);
  bg.addColorStop(0, '#150e2a');
  bg.addColorStop(1, '#0b0714');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1200, 630);

  // Brand glows (mauve up-centre, teal up-right), matching the site hero.
  const mauveGlow = ctx.createRadialGradient(600, -80, 0, 600, -80, 640);
  mauveGlow.addColorStop(0, 'rgba(255, 46, 154, 0.20)');
  mauveGlow.addColorStop(1, 'rgba(255, 46, 154, 0)');
  ctx.fillStyle = mauveGlow;
  ctx.fillRect(0, 0, 1200, 630);

  const tealGlow = ctx.createRadialGradient(1000, 0, 0, 1000, 0, 520);
  tealGlow.addColorStop(0, 'rgba(28, 232, 240, 0.16)');
  tealGlow.addColorStop(1, 'rgba(28, 232, 240, 0)');
  ctx.fillStyle = tealGlow;
  ctx.fillRect(0, 0, 1200, 630);

  // Faint dot grid.
  ctx.fillStyle = 'rgba(255, 255, 255, 0.045)';
  for (let x = 40; x < 1200; x += 34) {
    for (let y = 40; y < 630; y += 34) {
      ctx.fillRect(x, y, 2, 2);
    }
  }

  // Synthwave sun, tucked into the top-right corner, plus a small teal ring.
  ctx.save();
  ctx.globalAlpha = 0.85;
  drawSun(ctx, 1120, 150, 210);
  ctx.restore();
  ctx.strokeStyle = TEAL;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(905, 70, 18, 0, Math.PI * 2);
  ctx.stroke();

  // Wordmark: ESTUS (cream) HEALTH (teal), in Bungee.
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  ctx.font = '400 26px "Bungee"';
  ctx.fillStyle = CREAM;
  ctx.fillText('ESTUS ', 60, 68);
  const estusW = ctx.measureText('ESTUS ').width;
  ctx.fillStyle = TEAL;
  ctx.fillText('HEALTH', 60 + estusW, 68);

  // Centre: archetype emoji.
  ctx.textAlign = 'center';
  ctx.font = '120px serif';
  ctx.fillText(archetypeEmoji, 600, 300);

  // Archetype name (auto-fit), in Archivo Black.
  const namePrefix = archetypeName.toUpperCase().startsWith('THE ') ? '' : 'A ';
  const nameText = `YOU'RE ${namePrefix}${archetypeName.toUpperCase()}`;
  const nameSize = fitFont(ctx, nameText, '"Archivo Black"', 52, 1040);
  ctx.font = `400 ${nameSize}px "Archivo Black"`;
  ctx.fillStyle = CREAM;
  ctx.fillText(nameText, 600, 400);

  // Subtitle, italic Poppins.
  ctx.font = 'italic 400 24px "Poppins"';
  ctx.fillStyle = SOFT;
  ctx.fillText(archetypeSubtitle, 600, 448);

  // Bottom divider + footer.
  ctx.strokeStyle = 'rgba(28, 232, 240, 0.35)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, 560);
  ctx.lineTo(1140, 560);
  ctx.stroke();

  ctx.font = '600 16px "Poppins"';
  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(236, 228, 255, 0.7)';
  ctx.fillText('www.estushealth.com', 60, 592);
  ctx.textAlign = 'right';
  ctx.fillStyle = MAUVE;
  ctx.fillText(quizName, 1140, 592);

  // Trigger download.
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${quizSlug}-${archetypeSlug}-result.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}
