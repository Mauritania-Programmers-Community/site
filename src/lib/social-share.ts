export interface ShareData {
  title: string;
  description: string;
  url: string;
  hashtags?: string[];
}

/**
 * Generate Twitter/X share URL
 * @param data - Share data
 * @returns Twitter share URL
 */
export function getTwitterShareUrl(data: ShareData): string {
  const params = new URLSearchParams({
    text: `${data.title}\n\n${data.description}`,
    url: data.url,
  });

  if (data.hashtags && data.hashtags.length > 0) {
    params.append("hashtags", data.hashtags.join(","));
  }

  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

/**
 * Generate LinkedIn share URL
 * @param data - Share data
 * @returns LinkedIn share URL
 */
export function getLinkedInShareUrl(data: ShareData): string {
  const params = new URLSearchParams({
    url: data.url,
  });

  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

/**
 * Generate Facebook share URL
 * @param data - Share data
 * @returns Facebook share URL
 */
export function getFacebookShareUrl(data: ShareData): string {
  const params = new URLSearchParams({
    u: data.url,
  });

  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}

/**
 * Generate WhatsApp share URL
 * @param data - Share data
 * @returns WhatsApp share URL
 */
export function getWhatsAppShareUrl(data: ShareData): string {
  const text = `${data.title}\n\n${data.description}\n\n${data.url}`;
  const params = new URLSearchParams({
    text,
  });

  return `https://wa.me/?${params.toString()}`;
}

/**
 * Generate Telegram share URL
 * @param data - Share data
 * @returns Telegram share URL
 */
export function getTelegramShareUrl(data: ShareData): string {
  const params = new URLSearchParams({
    url: data.url,
    text: `${data.title}\n\n${data.description}`,
  });

  return `https://t.me/share/url?${params.toString()}`;
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise<boolean> - Success status
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
}

/**
 * Use native share API if available, otherwise fallback to custom share
 * @param data - Share data
 * @returns Promise<boolean> - Success status
 */
export async function shareNative(data: ShareData): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share({
        title: data.title,
        text: data.description,
        url: data.url,
      });
      return true;
    } catch (error) {
      // User cancelled or error occurred
      return false;
    }
  }
  return false;
}

/**
 * Generate email share URL
 * @param data - Share data
 * @returns Email mailto URL
 */
export function getEmailShareUrl(data: ShareData): string {
  const params = new URLSearchParams({
    subject: data.title,
    body: `${data.description}\n\n${data.url}`,
  });

  return `mailto:?${params.toString()}`;
}
