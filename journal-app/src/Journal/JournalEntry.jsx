import React, {useState, useEffect} from 'react';
import { collection, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useParams } from 'react-router-dom';

import db from '../db';

export default function JournalEntry() {
    const { id } = useParams();

    const [entry, setEntry] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                // const querySnapshot = await getDocs(collection(db, "journal-entries"));
                // setEntry(querySnapshot.docs)
                // querySnapshot.forEach((doc) => {
                //   // doc.data() is never undefined for query doc snapshots
                // //   console.log(doc.id, " => ", doc.data());
                // });


                const docRef = doc(db, "journal-entries", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setEntry(docSnap.data())
                } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
                }


         
            }    catch {
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
      
       
        }
        getData()   
    }, [])

    console.log(entry)

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (hasError) {
        return <h2>Error!!!</h2>
    }


    // console.log(entries)
    return (
        <div>
            <h1>Journal Entry</h1>
            <p>{entry.entry}</p>     
        </div>
    );
}
