const data = require("../variables.json")

/**
 * Handles all Lokalise events about Tasks
 * Given the payload, returns an embed to be sent via Discord webhook.
 * @param {*} payload Received payload from the incoming Lokalise webhook
 * @returns Discord message as JSON object
 */
module.exports =  function Contributor(payload){
	let message =  {...data.raw_message}

	message.embeds[0].fields = [{
		"name" : payload.task.title,
		"value" : "Description: `"+ payload.task.description + "`\nDue date: `" + payload.task.due_date + "`\nType: `"+ payload.task.type + "`\nId: `" + payload.task.id + "`",
		"inline" : false			
	}]

	if(payload.event === "project.task.created"){
		message.embeds[0].color = data.colors.added
		message.embeds[0].title = "Task created"
	}else if(payload.event === "project.task.closed"){
		message.embeds[0].color = data.colors.removed
		message.embeds[0].title = "Task closed"
	}else if(payload.event === "project.task.deleted"){
		message.embeds[0].color = data.colors.removed
		message.embeds[0].title = "Task deleted"
	}else if(payload.event === "project.task.language.closed"){
		message.embeds[0].color = data.colors.removed
		message.embeds[0].title = "Task language closed"
		message.embeds[0].fields[0].inline = true
		message.embeds[0].fields.push({
			"name" : payload.language.name,
			"value" : "Language code `" + payload.language.iso + "`\nLanguage id `" + payload.language.id + "`",
			"inline" : true
		})
	}else if(payload.event === "project.task.initial_tm_leverage.calculated"){
		message.embeds[0].color = data.colors.modified
		message.embeds[0].title = "Task TM leverage calculated"
		for (tm in payload.task.initial_tm_leverage){
			let field_value = ""
			for (val in payload.task.initial_tm_leverage[tm]){
				field_value += val + ": `" + payload.task.initial_tm_leverage[tm][val] + "`\n"
			}
			message.embeds[0].fields.push({
				"name" : tm,
				"value" : field_value,
				"inline" : false
			})
		}
	}
	else{
		return undefined
	}
	return message
}

