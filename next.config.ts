import type { NextConfig } from "next";

import { defaultLocale } from "./src/lib/i18n";

const nextConfig: NextConfig = {
  /**
   * Every page lives under a locale, so the bare root has to land somewhere.
   * It's a 307, not a 308: the day this starts choosing a language from the
   * visitor's `Accept-Language` header, a cached permanent redirect to English
   * would be stuck in front of it.
   */
  redirects() {
    return Promise.resolve([
      { source: "/", destination: `/${defaultLocale}`, permanent: false },
    ]);
  },
};

export default nextConfig;
