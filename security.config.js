const securityConfig = {
  // Content Security Policy (CSP)
  csp: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://vercel.live',
      'https://va.vercel-scripts.com'
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      'https://fonts.googleapis.com'
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com'
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'blob:'
    ],
    'media-src': [
      "'self'",
      'https:'
    ],
    'connect-src': [
      "'self'",
      'https:',
      'wss:'
    ],
    'frame-src': [
      "'self'",
      'https:'
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'self'"],
    'upgrade-insecure-requests': [],
    'require-trusted-types-for': ["'script'"]
  },

  hsts: {
    'max-age': 31536000,
    'includeSubDomains': true,
    'preload': true
  },

  crossOrigin: {
    'opener-policy': 'same-origin',
    'embedder-policy': 'require-corp'
  },

  additionalHeaders: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'X-DNS-Prefetch-Control': 'off',
    'X-Download-Options': 'noopen',
    'X-Permitted-Cross-Domain-Policies': 'none'
  },

  allowedOrigins: [
    'https://dexkit.com',
    'https://www.dexkit.com',
    'https://dexkit-landing.vercel.app',
    'http://localhost:3000'
  ],

  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
  }
};

module.exports = securityConfig;
