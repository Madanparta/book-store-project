import express from "express";

import {Book} from "../module/module.js";


const rout = express.Router();

// crating books list.
rout.post('/',async (req,res)=>{
    try{

        if (!req.body.title || !req.body.author || !req.body.publishYear) {
          return res.status(400).send({
            message: "please enter required data.",
          });
        }

        const newBook = {
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        }

        const create = await Book.create(newBook);

        res.status(200).send({
            message:"successfully created",
            data:create
        })

    }catch(error){
        console.log(error.message);
        res.status(500).send({
            message:error.message
        })
    }
})

// find the books list.
rout.get("/",async (req,res)=>{
    try{
        const getAll = await Book.find({});

        res.status(200).send({
            count:getAll.length,
            data:getAll
        })
    }catch(error){
        res.status(404).send({
            message:error.message
        })
    }
})

// finding by id.. 
rout.get("/:id",async (req,res)=>{
    try{
        const {id}=req.params;

        const getAll = await Book.findById(id);

        res.status(200).send({
            data:getAll
        })
    }catch(error){
        res.status(404).send({
            message:error.message
        })
    }
})

// updating books list
rout.put('/:id',async (req,res)=>{
    try{
        const {id}=req.params;

        const updating = await Book.findByIdAndUpdate(id,req.body);

        res.status(200).send({
            message:"successfully updated in books list."
        })
    }catch(error){
        res.status(500).send({
            message:error.message
        })
    }
})

// deleting the data
rout.delete('/:id',async (req,res)=>{
    try{
        const {id}=req.params;

        const deleted = await Book.findByIdAndDelete(id,req.body);

        res.status(200).send({
            message:"successfully deleted books list."
        })
    }catch(error){
        res.status(404).send({
            message:error.message
        })
    }
})

export default rout;