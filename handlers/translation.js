const data = require("../variables.json")

/**
 * Handles all Lokalise events about translations
 * Given the payload, returns an embed to be sent via Discord webhook.
 * @param {*} payload Received payload from the incoming Lokalise webhook
 * @returns Discord message as JSON object
 */
module.exports =  function Translation(payload){
	let message = data.raw_message
	let urlToKey = "https://app.lokalise.com/project/" + payload.project.id + "/?k=" + payload.key.id
	message.embeds[0].url = urlToKey

	if(payload.event.includes("updated")){
		message.embeds[0].color = data.colors.modified
		message.embeds[0].title = "Translation updated"
		message.embeds[0].description += "\nKey: `" + payload.key.name + "`"
		message.embeds[0].fields = [
			{
				"name" : "New value",
				"value" : "`" + payload.translation.value + "`",
				"inline" : true
			},	
			{
				"name" : "Old value",
				"value" : "`" + payload.translation.previous_value + "`",
				"inline" : true
			}
		]
	}else if(payload.event.includes("proofread")){
		message.embeds[0].color = data.colors.added
		message.embeds[0].title = "Translation proofread"
		message.embeds[0].fields = [{
			"name" : payload.key.name,
			"value" : payload.translation.value,
			"inline" : false
		}]
	}else{
		return undefined
	}
	return message
}

