import {
  portfolioProjects,
  type PortfolioProject,
} from "./project-data";

export type OtherProject = {
  name: string;
  url: string;
  language: string | null;
  updatedAt: string;
  stars: number;
};

type GitHubRepository = {
  name: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  updated_at: string;
};

export type ProjectCollection = {
  featuredProjects: PortfolioProject[];
  otherProjects: OtherProject[];
  githubAvailable: boolean;
};

const featuredRepos = new Set(
  portfolioProjects.map((project) => project.repo.toLowerCase()),
);

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatRepositoryName(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function enrichProjects(
  repositories: GitHubRepository[],
): PortfolioProject[] {
  const repositoryByName = new Map(
    repositories.map((repository) => [repository.name.toLowerCase(), repository]),
  );

  return portfolioProjects
    .filter((project) => project.featured)
    .sort((first, second) => first.priority - second.priority)
    .map((project) => {
      const repository = repositoryByName.get(project.repo.toLowerCase());

      if (!repository) return project;

      return {
        ...project,
        repositoryUrl: repository.html_url,
        demoUrl: project.demoUrl ?? repository.homepage ?? undefined,
        updatedAt: formatUpdatedAt(repository.updated_at),
        language: repository.language ?? undefined,
        stars: repository.stargazers_count,
      };
    });
}

export async function getPortfolioProjects(): Promise<ProjectCollection> {
  const featuredProjects = enrichProjects([]);

  try {
    const response = await fetch(
      "https://api.github.com/users/Readwips/repos?sort=updated&direction=desc&per_page=100",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "Readwips-portfolio",
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(1500),
      },
    );

    if (!response.ok) {
      return { featuredProjects, otherProjects: [], githubAvailable: false };
    }

    const repositories = (await response.json()) as GitHubRepository[];
    const otherProjects = repositories
      .filter(
        (repository) =>
          !repository.fork &&
          !repository.archived &&
          repository.name.toLowerCase() !== "web_porto" &&
          !featuredRepos.has(repository.name.toLowerCase()),
      )
      .slice(0, 4)
      .map((repository) => ({
        name: formatRepositoryName(repository.name),
        url: repository.html_url,
        language: repository.language,
        updatedAt: formatUpdatedAt(repository.updated_at),
        stars: repository.stargazers_count,
      }));

    return {
      featuredProjects: enrichProjects(repositories),
      otherProjects,
      githubAvailable: true,
    };
  } catch {
    return { featuredProjects, otherProjects: [], githubAvailable: false };
  }
}
