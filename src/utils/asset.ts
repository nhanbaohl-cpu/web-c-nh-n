/// <reference types="vite/client" />

/**
 * Resolves static asset URLs dynamically using the Vite BASE_URL.
 * This guarantees images load successfully under any nested subpaths,
 * proxy paths, or customized deployment environments.
 */
export function getAssetUrl(url: string | undefined | null): string {
  if (!url) return "";
  
  // Return early if it's already a base64 string, an absolute URL, or an external link
  if (
    url.startsWith("data:") ||
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
  
  return `${cleanBase}${cleanUrl}`;
}
