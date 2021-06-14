const data = require("../variables.json")

/**
 * Handles all Lokalise events about Keys
 * Given the payload, returns an embed to be sent via Discord webhook.
 * @param {*} payload Received payload from the incoming Lokalise webhook
 * @returns Discord message as JSON object
 */
module.exports =  function Key(payload){
	let message = data.raw_message
	
	message.embeds[0].description = "Project: `" + payload.project.name + "`"
	message.embeds[0].author.name = payload.user.full_name
	message.embeds[0].timestamp = payload.created_at

	if(payload.event.includes("deleted")){
		message.embeds[0].color = data.colors.removed
		message.embeds[0].title = "Keys deleted"
		let fields = []
		for (key of payload.keys) {
			fields.push({
				"name" : key.name,
				"value" : "Key id `" + key.id + "`",
				"inline" : true
			})
		}
		message.embeds[0].fields = fields
	}else if(payload.event === "project.key.added" ){
		message.embeds[0].color = data.colors.added
		message.embeds[0].title = "Key added"
		message.embeds[0].fields = [{
			"name" : payload.key.name,
			"value" : "Base value: `" + payload.key.base_value + "`\nKey id `" + payload.key.id + "`",
			"inline" : false
		}]
	}else if(payload.event.includes("modified")){
		message.embeds[0].color = data.colors.modified
		message.embeds[0].title = "Key modified"
		message.embeds[0].fields = [{
			"name" : payload.key.name,
			"value" : "Previous value: `" + payload.key.previous_name + "`\nKey id `" + payload.key.id + "`",
			"inline" : false
		}]
	}else if(payload.event.includes("comment")){
		message.embeds[0].color = data.colors.modified
		message.embeds[0].title = "Comment added on key"
		message.embeds[0].fields = [{
			"name" : payload.key.name,
			"value" : payload.comment.value,
			"inline" : false
		}]
	}else{
		return undefined
	}
	return message
}

