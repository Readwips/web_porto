import Portfolio from "./portfolio";
import { getPortfolioProjects } from "./projects";

export default async function Home() {
  const projects = await getPortfolioProjects();

  return <Portfolio {...projects} />;
}
