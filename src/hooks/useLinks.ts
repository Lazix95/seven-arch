import { useLocalRouter } from '@/hooks/useLocalRouter';

export function useLinks() {
  const { push } = useLocalRouter();

  function openExternalLink(url?: string) {
    if (!url) return;
    window.open(url, '_blank');
  }

  async function openInternalLink(url: string) {
    await push(url);
  }

  function isExternalLink(url?: string) {
    if (!url) return false;
    return url.startsWith('http');
  }

  return {
    openExternalLink,
    openInternalLink,
    isExternalLink,
  };
}
