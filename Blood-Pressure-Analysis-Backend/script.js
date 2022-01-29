const express = require('express')
const axios = require('axios')

setInterval(function () {
    var datetime = new Date();
    var postData = {
        "date": datetime.toISOString(),
        "systolic": Math.floor(
            Math.random() * (90) + 10
        ),
        "diastolic": Math.floor(
            Math.random() * (90) + 10
        )
    };
    console.log(postData);
    axios.post('http://localhost:5000/add-data',
        postData,
    )
        .then(response => {
            console.log(response.data);
        })

        .catch(error => console.log(error))
}, 5000);

