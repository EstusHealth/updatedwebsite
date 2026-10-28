// Renders a shareable quiz result card in the Estus brand: bone card, black
// masthead with the four-colour stripe, Oswald headline, Barlow body.
// Fonts are loaded globally via Google Fonts in index.html; we await them so
// the canvas draws with the real brand type rather than a system fallback.

const BLACK = '#090909';
const BONE = '#FBFAF8';
const SOFT = '#3F434B';
const STRIPE = ['#344982', '#2F6F9E', '#2CA5B8', '#AB5C95'];

async function ensureFonts() {
  if (!document.fonts || !document.fonts.load) return;
  try {
    await Promise.all([
      document.fonts.load('700 52px "Oswald"'),
      document.fonts.load('500 26px "Oswald"'),
      document.fonts.load('italic 500 24px "Barlow"'),
      document.fonts.load('700 16px "Barlow Semi Condensed"'),
    ]);
  } catch (e) {
    /* fall through to whatever is available */
  }
}

// Shrink a font until the text fits within maxWidth.
function fitFont(ctx, text, weight, family, startPx, maxWidth) {
  let size = startPx;
  ctx.font = `${weight} ${size}px ${family}`;
  while (ctx.measureText(text).width > maxWidth && size > 24) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${family}`;
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

  // Bone ground inside a black rule.
  ctx.fillStyle = BONE;
  ctx.fillRect(0, 0, 1200, 630);
  ctx.strokeStyle = BLACK;
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 1192, 622);

  // Black masthead with stripe and wordmark.
  ctx.fillStyle = BLACK;
  ctx.fillRect(0, 0, 1200, 110);
  STRIPE.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(60 + i * 40, 34, 40, 7); });
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  ctx.font = '700 26px "Oswald"';
  ctx.fillStyle = BONE;
  const est = 'ESTUS ';
  ctx.fillText(est, 60, 80);
  const w = ctx.measureText(est).width;
  ctx.font = '500 26px "Oswald"';
  ctx.fillText('HEALTH', 60 + w, 80);
  ctx.textAlign = 'right';
  ctx.font = '700 18px "Barlow Semi Condensed"';
  ctx.fillStyle = '#7FD3E0';
  ctx.fillText(quizName.toUpperCase(), 1140, 80);

  // Centre: archetype emoji.
  ctx.textAlign = 'center';
  ctx.font = '110px serif';
  ctx.fillText(archetypeEmoji, 600, 290);

  // Archetype name (auto-fit), Oswald.
  const namePrefix = archetypeName.toUpperCase().startsWith('THE ') ? '' : 'A ';
  const nameText = `YOU'RE ${namePrefix}${archetypeName.toUpperCase()}`;
  const nameSize = fitFont(ctx, nameText, 700, '"Oswald"', 64, 1040);
  ctx.font = `700 ${nameSize}px "Oswald"`;
  ctx.fillStyle = BLACK;
  ctx.fillText(nameText, 600, 395);

  // Subtitle, italic Barlow.
  ctx.font = 'italic 500 26px "Barlow"';
  ctx.fillStyle = SOFT;
  ctx.fillText(archetypeSubtitle, 600, 448);

  // Footer rule and URL.
  ctx.fillStyle = BLACK;
  ctx.fillRect(60, 548, 1080, 2);
  ctx.font = '700 18px "Barlow Semi Condensed"';
  ctx.textAlign = 'left';
  ctx.fillStyle = BLACK;
  ctx.fillText('WWW.ESTUSHEALTH.COM', 60, 590);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#344982';
  ctx.fillText('NEUROAFFIRMING OT · PERTH + TELEHEALTH', 1140, 590);

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
