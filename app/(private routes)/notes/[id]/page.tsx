import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Note details | NoteHub`,
    description: "Browse and organize your notes in NoteHub.",
    openGraph: {
      title: `Note details | NoteHub`,
      description: "Browse and organize your notes in NoteHub.",
      url: `/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 425,
          height: 283,
          alt: "NoteHub Preview",
        },
      ],
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;

  return <NoteDetailsClient id={id} />;
}
