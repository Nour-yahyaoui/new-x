import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Nour Yahyaoui | Full-Stack Developer from Tunisia",
  description:
    "19-year-old full-stack developer from Tunisia with 3+ years of freelance experience in React, Next.js, Node.js and PostgreSQL, now expanding into Rust (Actix Web / Axum).",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Nour Yahyaoui | Full-Stack Developer",
    description:
      "19-year-old full-stack developer from Tunisia with 3+ years of freelance experience in React, Next.js, Node.js and PostgreSQL, now expanding into Rust.",
    url: "/about",
    type: "profile",
  },
};

export default function Page() {
  return <AboutClient />;
}
