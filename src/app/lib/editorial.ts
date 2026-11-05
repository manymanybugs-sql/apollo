/**
 * Optional Apollo-only material for Substack posts.
 * The key is the final /p/<slug> segment of the Substack URL.
 * RSS supplies the title, image, date, introduction fallback and Substack link.
 * Add your own words here whenever you want a custom introduction or commentary.
 * For an episode-specific Spotify button, set spotifyUrl to that episode's URL.
 *
 * Example:
 * "my-article-slug": {
 *   introduction: "Why I wanted to have this conversation...",
 *   commentary: ["What stood out to me was...", "Another thing I took away..."],
 *   spotifyUrl: "https://open.spotify.com/episode/...",
 * },
 */
export type Editorial = {
  introduction?: string;
  commentary?: string[];
  spotifyUrl?: string;
};

export const editorialBySlug: Record<string, Editorial> = {};
