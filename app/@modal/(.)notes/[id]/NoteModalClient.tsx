'use client';

import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery, hydrate } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import NoteDetailsClient from '@/app/(private routes)/notes/[id]/NoteDetails.client';
import { fetchNoteById } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import { useRouter } from 'next/navigation';

interface Props {
  noteId: string;
  dehydratedState?: unknown;
}

export default function NoteModalClient({ noteId, dehydratedState }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (dehydratedState) {
      hydrate(queryClient, dehydratedState);
    }
  }, [dehydratedState, queryClient]);

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  if (!isOpen) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <NoteModalContent noteId={noteId} onClose={handleClose} />
    </QueryClientProvider>
  );
}

function NoteModalContent({ noteId, onClose }: { noteId: string; onClose: () => void }) {
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !note) return <div>Error loading note.</div>;

  return (
    <Modal onClose={onClose}>
      <button onClick={onClose} style={{ float: 'right' }}>Close</button>
      <NoteDetailsClient note={note} />
    </Modal>
  );
}
