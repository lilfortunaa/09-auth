'use client';

import type { Note } from '@/types/note';
import css from '../../../../components/NoteDetails/NoteDetails.module.css';

interface Props {
  note: Note;
}

export default function NoteDetailsClient({ note }: Props) {
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
