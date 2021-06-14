const express = require("express")
const bodyParser = require("body-parser")
const axios = require('axios')
const dotenv = require('dotenv').config()
const data = require("./variables.json")
const Language = require("./handlers/language")

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.listen(PORT, () => console.log("Webhook listening at Port: " + PORT))

app.post("/", (req,res) => {
	let event = req.body.event
	let message;
	//TODO: add import/export/snapshot
	if(event.includes("language")){
		message = Language(req.body)
	}else if(event.includes("key")){

	}else if(event.includes("translation")){

	}else if(event.includes("contributor")){

	}else if(event.includes("task")){

	}
	//TODO: error handling if msg == undefined
	axios.post(process.env.OUTPUT_WEBHOOK,  message).catch(error => console.error(error))
	res.status(200).end()
})