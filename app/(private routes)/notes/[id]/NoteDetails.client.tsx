'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi'; 
import type { Note } from '@/types/note';
import css from '../../../../components/NoteDetails/NoteDetails.module.css';

interface Props {
  id: string;
}

export default function NoteDetailsClient({ id }: Props) {
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !note) return <div>Error loading note</div>;

  const formattedDate = new Date(note.createdAt).toLocaleString();

  return (
    <article className={css.container}>
      <header className={css.header}>
        <h2>{note.title}</h2>
        {note.tag && <span className={css.tag}>{note.tag}</span>}
      </header>
      <section className={css.content}>{note.content}</section>
      <footer className={css.date}>{formattedDate}</footer>
    </article>
  );
}
