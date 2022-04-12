const PATTERNS = [
  /youtu\.be\/([^#\&\?]{11})/, // youtu.be/<id>
  /\?v=([^#\&\?]{11})/, // ?v=<id>
  /\&v=([^#\&\?]{11})/, // &v=<id>
  /embed\/([^#\&\?]{11})/, // embed/<id>
  /\/v\/([^#\&\?]{11})/, // /v/<id>
];

// Original source: `get-youtube-id` package
export default function getYoutubeId(
  url: string,
  { fuzzy = true }: { fuzzy?: boolean } = {}
): string | null {
  if (/youtu\.?be/.test(url)) {
    // Look first for known patterns
    // If any pattern matches, return the ID
    for (let i = 0; i < PATTERNS.length; i++) {
      const match = PATTERNS[i].exec(url);
      if (match) {
        return match[1];
      }
    }

    if (fuzzy) {
      // If that fails, break it apart by certain characters and look
      // for the 11 character key
      const tokens = url.split(/[\/\&\?=#\.\s]/g);
      for (let i = 0; i < tokens.length; i++) {
        if (/^[^#\&\?]{11}$/.test(tokens[i])) {
          return tokens[i];
        }
      }
    }
  }

  return null;
}
