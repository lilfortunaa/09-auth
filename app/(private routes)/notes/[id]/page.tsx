import { serverFetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await serverFetchNoteById(id);

  return {
    title: note?.title ? `${note.title} | NoteHub` : 'Note details | NoteHub',
    description: note?.content ?? 'Browse and organize all your notes in NoteHub.',
    openGraph: {
      title: note?.title ?? 'Note details | NoteHub',
      description: note?.content ?? 'Browse and organize all your notes in NoteHub.',
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

export default async function NotePage(rawProps: { params: { id: string } }) {
  const props: NotePageProps = { params: Promise.resolve(rawProps.params) };
  const { id } = await props.params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => serverFetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
