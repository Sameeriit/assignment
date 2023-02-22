const express = require('express');
const router = express.Router();
// const fetch = require('node-fetch');
// import fetch from 'node-fetch';




router.get('/',async function(req,res){
    const url = 'https://randomuser.me/api/?format=json';
 fetch('https://randomuser.me/api/?format=json').then((data)=> {return data.json();})
    .then((objectData)=>{
        console.log(objectData[0].title);
        let tableData = "";
        objectData.map((values)=>{
            tableData += ` <tr>
            <th scope="row">1</th>
            <td>${values.gender}</td>
            <td>${values.name}</td>
            <td>${values.location}</td>
            <td>${values.street}</td>
            <td>${values.city}</td>
          </tr>`;
        });
        document.getElementById("table_body").
        innerHTML = tableData;
}).catch(err=> console.log(err));
  

    try{
        let response = await fetch(url);
        response = await response.json();
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({msg:`Internal server Error.`});
    }

});
module.exports = router;