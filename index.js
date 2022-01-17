const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")
const dotenv = require("dotenv").config()
const data = require("./variables.json")
const Language = require("./handlers/language")
const Key = require("./handlers/key")
const Translation = require("./handlers/translation")
const Contributor = require("./handlers/contributor")
const Task = require("./handlers/task")
const Order = require("./handlers/order")
const Export = require("./handlers/export")
const Import = require("./handlers/import")
const Deleted = require("./handlers/deleted")

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.listen(PORT, () => {
	if(dotenv.error) console.error(dotenv.error)
	// eslint-disable-next-line no-console
	console.log("Webhook listening at Port: " + PORT)
})
app.post("/", (req,res) => {
	const payload = req.body
	if (Array.isArray(payload)) {
		if (payload[0] === "ping") {
			res.status(200).end()
			return
		} else {
			res.status(400).end()
			return
		}
	}

	const event = payload.event
	let message =  data.raw_message
	if(event.startsWith("project.language")){
		message = Language(payload)
	}else if(event.startsWith("project.key")){
		message = Key(payload)
	}else if(event.startsWith("project.translation")){
		message = Translation(payload)
	}else if(event.startsWith("project.contributor")){
		message = Contributor(payload)
	}else if(event.startsWith("project.task")){
		message = Task(payload)
	}else if(event.startsWith("team.order")){
		message = Order(payload)
	}else if(event === "project.imported"){
		message = Import(payload)
	}else if(event === "project.exported"){
		message = Export(payload)
	}else if(event === "project.deleted"){
		message = Deleted(payload)
	}else if(event === "project.snapshot"){
		delete message.embeds[0].fields
		message.embeds[0].title = "Snapshot"
		message.embeds[0].color = data.colors.added
	}
	if(message === undefined){
		res.status(500).end()
		return
	}

	message.embeds[0].description = "Project: `" + payload.project.name + "`"
	message.embeds[0].timestamp = payload.created_at

	if(payload.user){
		message.embeds[0].author.name = payload.user.full_name
		if(data.privacy.show_user_email){
			message.embeds[0].footer.text = payload.user.email
		}
	}
	axios.post(process.env.OUTPUT_WEBHOOK,  message).catch(error => console.error(error))
	res.status(200).end()
	return
})
