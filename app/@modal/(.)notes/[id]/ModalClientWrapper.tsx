'use client';
import { Note } from '@/types/note';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NoteDetailsClient from '@/app/(private routes)/notes/[id]/NoteDetails.client';

interface Props {
  note: Note;
}

export default function ModalClientWrapper({ note }: Props) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NoteDetailsClient id={note.id} />
    </Modal>
  );
}
