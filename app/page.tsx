import Portfolio from "./portfolio";
import { getLatestProjects } from "./projects";

export default async function Home() {
  const projects = await getLatestProjects();

  return <Portfolio view="home" projects={projects} />;
}
