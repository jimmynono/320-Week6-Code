import React, {useState} from 'react'
import { collection, addDoc } from "firebase/firestore"; 

import db from '../db';

export function AddJournal () {
  const [entry, setEntry] = useState('')

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "journal-entries"), {
      entry: entry,
      createdAt: new Date()
    });
    setEntry('')
  }

  return (
    <>
      <h2>Add an entry</h2>
      <form onSubmit={handleSubmit}>

        <label htmlFor="entry-input">Add entry</label>
        <textarea id="entry-input" onChange={e => setEntry(e.target.value)} value={entry} />
        <button type='submit'>Submit Entry</button>
      </form>
    </>
  )

}