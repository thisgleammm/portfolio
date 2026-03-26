import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/lib/lastfm';

export const dynamic = 'force-dynamic';

export async function GET() {
  const response = await getNowPlaying();

  if (!response.ok) {
    return NextResponse.json({ isPlaying: false });
  }

  const data = await response.json();
  const track = data.recenttracks.track[0];

  if (!track) {
    return NextResponse.json({ isPlaying: false });
  }

  // Last.fm uses @attr: { nowplaying: "true" } for active listening
  const isPlaying = track['@attr']?.nowplaying === 'true';
  const title = track.name;
  const artist = track.artist['#text'];
  const album = track.album['#text'];
  const albumImageUrl = track.image[track.image.length - 1]['#text'];
  const songUrl = track.url;

  return NextResponse.json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  });
}
