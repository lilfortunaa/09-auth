import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

interface NotePageProps {
  params: { id: string };
}


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;

  return {
    title: `Note details | NoteHub`,
    description: 'Browse and organize your notes in NoteHub.',
    openGraph: {
      title: `Note details | NoteHub`,
      description: 'Browse and organize your notes in NoteHub.',
      url: `/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 425,
          height: 283,
          alt: 'NoteHub Preview',
        },
      ],
    },
  };
}


export default function NotePage({ params }: NotePageProps) {
  return <NoteDetailsClient id={params.id} />;
}
