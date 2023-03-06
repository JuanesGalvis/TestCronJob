const express = require('express');
const CORS = require('cors');
const app = express();

const fetch = require('node-fetch');

// Variables de entorno
require('dotenv').config();

app.use(CORS());

app.get('/', (req, res) => {
    res.json({
        message: "HOLA, PROBANDO LAS CRON JOBS DE VERCEL"
    })
})

app.get('/cron', async (req, res) => {

    const response = await fetch('https://api.airtable.com/v0/app6QkHya20rCFqu4/tblEtwISU4HA0dUxc', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.AIRTABLE_TOKEN}`
        },
        body: JSON.stringify({
            "records": [
                {
                    "fields": {
                        "Message": `Generado: ${new Date()}`,
                    }
                }
            ]
        })
    })

    const data = await response.json();
    res.json({
        message: "Resultado Airtable",
        result: data
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en el puerto: ${process.env.PORT || 3000}`);
})

