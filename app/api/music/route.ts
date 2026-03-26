import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { getNowPlaying } from '@/lib/lastfm';

const getCachedMusic = unstable_cache(
  async () => {
    const response = await getNowPlaying();
    if (!response.ok) return { isPlaying: false };
    const data = await response.json();
    const track = data.recenttracks.track[0];
    if (!track) return { isPlaying: false };

    const isPlaying = track['@attr']?.nowplaying === 'true';

    return {
      album: track.album['#text'],
      albumImageUrl: track.image[track.image.length - 1]['#text'],
      artist: track.artist['#text'],
      isPlaying,
      songUrl: track.url,
      title: track.name,
    };
  },
  ['now-playing'],
  { revalidate: 30 }
);

export async function GET() {
  const data = await getCachedMusic();
  return NextResponse.json(data);
}
