/*
  ВРЕМЕННЫЙ логотип, нарисованный вручную «по мотивам».
  TODO: экспортировать настоящий логотип из Figma в SVG
  (выделить иконку → справа Export → SVG) и подставить сюда.
*/
function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <defs>
        <linearGradient id="auring-logo-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--logo-purple)' }} />
          <stop offset="1" style={{ stopColor: 'var(--logo-blue)' }} />
        </linearGradient>
      </defs>
      <circle cx="14" cy="14" r="14" style={{ fill: 'var(--color-arapawa)' }} />
      <circle
        cx="14"
        cy="14"
        r="9"
        fill="none"
        stroke="url(#auring-logo-ring)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="48 9"
      />
      <path
        d="M14 10.5 15 13l2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"
        style={{ fill: 'var(--color-white)' }}
      />
    </svg>
  )
}

export default Logo
