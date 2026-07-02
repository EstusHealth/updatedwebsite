export function generateShareImage({
  quizName,
  archetypeName,
  archetypeEmoji,
  archetypeSubtitle,
  quizSlug,
  archetypeSlug,
}) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');

  // Background gradient (warm dark)
  const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
  gradient.addColorStop(0, 'hsl(25, 40%, 28%)');
  gradient.addColorStop(1, 'hsl(20, 25%, 15%)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 630);

  // Noise texture (subtle random dots)
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * 1200;
    const y = Math.random() * 630;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
    ctx.fillRect(x, y, 1, 1);
  }

  const cream = 'hsl(35, 30%, 92%)';

  // Top-left: ESTUS HEALTH
  ctx.fillStyle = cream;
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('ESTUS HEALTH', 60, 60);

  // Centre: emoji
  ctx.font = '120px serif';
  ctx.textAlign = 'center';
  ctx.fillText(archetypeEmoji, 600, 290);

  // Below emoji: archetype name
  ctx.fillStyle = cream;
  ctx.font = 'bold 48px sans-serif';
  const namePrefix = archetypeName.toUpperCase().startsWith('THE ') ? '' : 'A ';
  ctx.fillText(`YOU'RE ${namePrefix}${archetypeName.toUpperCase()}`, 600, 380);

  // Below: subtitle
  ctx.font = 'italic 24px serif';
  ctx.fillStyle = 'rgba(229, 220, 204, 0.8)';
  ctx.fillText(archetypeSubtitle, 600, 430);

  // Bottom strip
  ctx.strokeStyle = 'rgba(229, 220, 204, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, 560);
  ctx.lineTo(1140, 560);
  ctx.stroke();

  ctx.fillStyle = 'rgba(229, 220, 204, 0.5)';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('www.estushealth.com', 60, 590);
  ctx.textAlign = 'right';
  ctx.fillText(quizName, 1140, 590);

  // Trigger download
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
