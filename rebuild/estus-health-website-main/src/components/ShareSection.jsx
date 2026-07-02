import { useState } from 'react';
import { Link as LinkIcon, Download, CheckCircle, Copy } from 'lucide-react';
import { useToast } from './Toast';
import { generateShareImage } from './CanvasShareImage';

const btnBase = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  border: '1.5px solid hsl(25, 20%, 75%)',
  background: 'transparent',
  borderRadius: '0.5rem',
  padding: '0.6rem 1.25rem',
  fontFamily: "'Oswald', sans-serif",
  textTransform: 'uppercase',
  fontSize: '0.8rem',
  letterSpacing: '0.05em',
  color: 'hsl(20, 25%, 15%)',
  cursor: 'pointer',
  transition: 'all 0.2s',
};

function ShareButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={btnBase}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'hsl(25, 35%, 35%)';
        e.currentTarget.style.color = 'hsl(25, 35%, 35%)';
        e.currentTarget.style.background = 'hsla(25, 35%, 35%, 0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'hsl(25, 20%, 75%)';
        e.currentTarget.style.color = 'hsl(20, 25%, 15%)';
        e.currentTarget.style.background = 'transparent';
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = 'hsl(25, 35%, 35%)';
        e.currentTarget.style.outline = '2px solid hsl(25, 35%, 35%)';
        e.currentTarget.style.outlineOffset = '2px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'hsl(25, 20%, 75%)';
        e.currentTarget.style.outline = 'none';
      }}
    >
      {children}
    </button>
  );
}

export default function ShareSection({
  quizName,
  quizSlug,
  archetypeName,
  archetypeSlug,
  archetypeEmoji,
  archetypeSubtitle,
  shareCaption,
}) {
  const { showToast } = useToast();
  const [linkCopied, setLinkCopied] = useState(false);
  const shareURL = `${window.location.origin}${window.location.pathname}?result=${archetypeSlug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareURL);
    setLinkCopied(true);
    showToast('Link copied!');
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleShareImage = () => {
    generateShareImage({
      quizName,
      archetypeName,
      archetypeEmoji,
      archetypeSubtitle,
      quizSlug,
      archetypeSlug,
    });
    showToast('Image saved!');
  };

  const handleFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareURL)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(shareCaption);
    showToast('Caption copied!');
  };

  return (
    <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
      <h3
        style={{
          fontFamily: "'Oswald', sans-serif",
          textTransform: 'uppercase',
          fontSize: '1.25rem',
          color: 'hsl(20, 25%, 15%)',
          marginBottom: '0.5rem',
          letterSpacing: '0.02em',
        }}
      >
        SHARE YOUR RESULT
      </h3>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.875rem',
          color: 'hsl(20, 15%, 40%)',
          marginBottom: '1.5rem',
        }}
      >
        Let others know what type you are.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}
      >
        <ShareButton onClick={handleCopyLink}>
          {linkCopied ? <CheckCircle size={16} /> : <LinkIcon size={16} />}
          {linkCopied ? 'COPIED!' : 'COPY LINK'}
        </ShareButton>
        <ShareButton onClick={handleShareImage}>
          <Download size={16} /> SHARE IMAGE
        </ShareButton>
        <ShareButton onClick={handleFacebook}>FACEBOOK</ShareButton>
        <ShareButton onClick={handleLinkedIn}>LINKEDIN</ShareButton>
      </div>

      {/* Pre-written caption */}
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <p
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: '0.7rem',
            color: 'hsl(20, 15%, 40%)',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            letterSpacing: '0.05em',
          }}
        >
          PRE-WRITTEN CAPTION
        </p>
        <div
          style={{
            border: '1px solid hsl(25, 20%, 75%)',
            borderRadius: '0.5rem',
            padding: '1rem',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.875rem',
            color: 'hsl(20, 25%, 15%)',
            lineHeight: 1.6,
            textAlign: 'left',
            marginBottom: '0.75rem',
            background: 'hsl(35, 30%, 92%)',
          }}
        >
          {shareCaption}
        </div>
        <ShareButton onClick={handleCopyCaption}>
          <Copy size={14} /> COPY CAPTION
        </ShareButton>
      </div>
    </div>
  );
}
