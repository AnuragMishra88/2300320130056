const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const logging = (req, res, next)=>{
  const headers = req.body.authorization;
  if(!headers){
    res.status(400).json({
      message : "NO TOKEN FOUND"
    })
  }
  const token = headers.split('')[1];
  try{
    const decode = await fetch('http://4.224.186.213/evaluation-service/logs',{
      headers : {
        'Authorization ' : `Bearer ${token}`
      }
    })
    req.user = decode;
    next();

  }
  catch(error){
    return res.status(400).json({
      message : error.message
    })
  }

}