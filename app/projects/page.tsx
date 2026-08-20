import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Nour Yahyaoui - Full-Stack Developer Portfolio",
  description:
    "A collection of full-stack, e-commerce, and open-source projects built by Nour Yahyaoui with React, Next.js, React Native, PostgreSQL and more.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Nour Yahyaoui",
    description:
      "A collection of full-stack, e-commerce, and open-source projects built by Nour Yahyaoui with React, Next.js, React Native, PostgreSQL and more.",
    url: "/projects",
    type: "website",
  },
};

export default function Page() {
  // ItemList structured data helps search engines understand this is a
  // curated list of creative works (each project) authored by Nour Yahyaoui.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: project.liveDemo || project.code || undefined,
        creator: {
          "@type": "Person",
          name: "Nour Yahyaoui",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <ProjectsClient />
    </>
  );
}
