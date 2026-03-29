export const revalidate = 3600; // cache 1 hour

export async function GET() {
  const username = "thisgleammm";
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        next: { revalidate: 3600 }
      }
    );
    
    if (!res.ok) {
      return Response.json({ error: "Failed to fetch from GitHub API" }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
