// next.config.js
//
// This is your Next.js config file. It goes in the ROOT of your project
// (same folder as package.json). If you already have a next.config.js,
// merge the redirects array into your existing one. Don't replace the file.
//
// What this does:
// Anyone who visits /services/resistance-breakers (old bookmarks, Google,
// external links) gets permanently redirected to /services instead of a 404.
// The "permanent: true" makes it a 301, so search engines will update their index.

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/services/resistance-breakers",
      destination: "/services",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
