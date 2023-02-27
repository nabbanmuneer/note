import React, { useState,useEffect } from "react";
import { AiFillCaretRight,AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
const NoteBar = () => {
  const [note, setNote] = useState("");
  const [data,setData] = useState([])
  const noteData =async ()=>{
    const data = { note:note };
    console.log(note);
    const value = await axios
    .post('http://localhost:3000/insert',{note}).then((res)=>{
      if(res.status == 400 ){
        setNote('')
      }
    })
    .catch(error => console.error('Error inserting data:', error));
  }

  const deleteData = (id)=>{
    axios
    .post('http://localhost:3000/delete',{id}).then((res)=>{
      
    })
  }
  
useEffect(() => {
  const getValue =  axios
    .get('http://localhost:3000/data').then(( res)=>{
    let notVal = res.data
     setNote(notVal);
     console.log(notVal);
    })

}, []);
  return (
    <div className="flex justify-center flex-row  h-screen">
      <div className="h-fit">
        <input
          name="duration"
          onChange={(e) => {
            setNote(e.target.value);
          }}
          className="border-4 border-slate-700 p-4 m-5 w-[400px]"
          type="text"
          placeholder="The the note"
          aria-label="note"
          value={note}
        />
      </div>
      <div className=" mt-10 text-2xl h-fit">
        <AiFillCaretRight />
          </div>
         <div className="h-fit">
           {note && note.map((value, index) =>
       <div className="   bg-yellow-400 p-5 m-5 w-[200px] h-fit" key={index} >
        <p>{value.note} </p>
        {value.createdAt}
        <div className="w-fit" onClick={deleteData(value.id)}><AiTwotoneDelete /></div>
        </div>
       )}</div>
    </div>
  );
};

export default NoteBar;
