import React, {useEffect, useState} from 'react';
import { collection, getDocs, setDoc, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore";  
import db from '../db';
import { Link } from 'react-router-dom';
import { AddJournal } from './AddJournal';

export default function Journal() {
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                // const querySnapshot = await getDocs(collection(db, "journal-entries"));
                // setEntries(querySnapshot.docs)
                // querySnapshot.forEach((doc) => {
                //   // doc.data() is never undefined for query doc snapshots
                // //   console.log(doc.id, " => ", doc.data());
                // });

                const q = query(collection(db, "journal-entries"), orderBy("createdAt", "desc"));

                onSnapshot(q, (doc) => {
                    console.log("Current data: ", );
                    setEntries(doc.docs)
                });
            }    catch {
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
      
       
        }
        getData()
        
        return () => onSnapshot
        
    }, [])

    const handleDelete= async (id) => {
        await deleteDoc(doc(db, 'journal-entries', id))
    }

    const handleEdit = async (id) => {
        const newData = window.prompt('New')
        await setDoc(doc(db, 'journal-entries', id) , {
            entry: newData,
            createdAt: new Date()
        })
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (hasError) {
        return <h2>Error!!!</h2>
    }


    // console.log(entries)
    return (
        <div>
            <h1>Journal</h1>

            <AddJournal />
            {entries.map((entry) => {
                console.log(entry.data())
                return <div key={entry.id}>
                    {entry.data().entry}
                    <Link to={`/journal/${entry.id}`}>
                        View
                    </Link>
                    <button onClick={() => handleDelete(entry.id)}>Delete</button>
                    <button onClick={() => handleEdit(entry.id)}>edit</button>                    
                    </div>

            })}
        </div>
    );
}
