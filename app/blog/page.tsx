import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Health Insights & Patient Guides | HealviaCare Blog",
  description:
    "Expert medical advice, surgical guides, and recovery tips from HealviaCare's specialists — covering LASIK, post-surgery care, insurance, and more.",
  alternates: {
    canonical: "https://healviacare.in/blog",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}