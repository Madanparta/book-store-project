import React,{useState,useEffect} from "react";
import {useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";


const EditBook = () => {
    const [title,setTile]=useState('');
    const [author,setAuthor]=useState('');
    const [publishYear,setPublishYear]=useState('');
    const [loading,setLoading]=useState(false);

    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const {id}=useParams();

    useEffect(()=>{
        setLoading(true);

        axios.get(`http://localhost:5555/books/${id}`)
        .then((res)=>{
            setLoading(false);
            setTile(res.data.data.title)
            setAuthor(res.data.data.author)
            setPublishYear(res.data.data.publishYear)
        })
        .catch((error)=>{
            setLoading(false);
            console.log(error);
            alert("An error happened. Please Check console");
        })
    },[])

    const handleEditBook = () =>{
        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5555/books/${id}`,data)
            .then(()=>{
                setLoading(false);
                enqueueSnackbar("Book Edited successfully",{variant:"success"})
                navigate('/');
            })
            .catch((error)=>{
                setLoading(false);
                // alert("An error happened. Please Check console");
                enqueueSnackbar("Erro",{variant:"error"})
                console.log(error);
            })
    }
    return(
        <div className="p-4">
            <BackButton/>
            <h1 className="text-3xl my-4">Create Book</h1>
            {loading ? <Spinner/> : " "}
            
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">

                <div className="my-4">

                    <label className="text-xl mr-4 text-gray-500">Title</label>
                    <input type="text" value={title} onChange={(e)=>setTile(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full"/>

                </div>

                <div className="my-4">

                    <label className="text-xl mr-4 text-gray-500">Author</label>
                    <input type="text" value={author} onChange={(e)=>setAuthor(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full"/>
                    
                </div>

                <div className="my-4">

                    <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input type="text" value={publishYear} onChange={(e)=>setPublishYear(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full"/>
                    
                </div>

                <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>Save</button>

            </div>
        
        </div>
    )
}
export default EditBook;