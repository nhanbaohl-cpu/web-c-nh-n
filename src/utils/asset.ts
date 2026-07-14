/// <reference types="vite/client" />

/**
 * Resolves static asset URLs dynamically using the Vite BASE_URL.
 * This guarantees images load successfully under any nested subpaths,
 * proxy paths, or customized deployment environments.
 */
export const downloadFile = (url: string, filename: string) => {
  // If the URL is already an absolute URL or data URL, try to open it directly
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    window.open(url, "_blank");
    return;
  }
  
  let safePath = url;
  const base = import.meta.env.BASE_URL || "/";
  if (base !== "/" && safePath.startsWith(base)) {
    safePath = safePath.slice(base.length);
  }
  safePath = safePath.replace(/^(\/|\\)/, '');
  
  // Extract the filename/path relative to public to pass to the download API
  // This bypasses iframe sandbox restrictions and fixes corruption issues
  const downloadUrl = `/api/download?file=${encodeURIComponent(safePath)}`;
  window.open(downloadUrl, "_blank");
};

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
