export type Contribution = {
  date: string;
  count: number;
  level: number;
};

export type GitHubData = {
  total: {
    [year: string]: number;
  };
  contributions: Contribution[];
};

export async function getGitHubContributions(username: string): Promise<GitHubData | null> {
  try {
    const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return null;
  }
}
