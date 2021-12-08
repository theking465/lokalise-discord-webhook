const data = require("../variables.json")

/**
 * Handles Lokalise event for deleted projects
 * Given the payload, returns an embed to be sent via Discord webhook.
 * @param {*} payload Received payload from the incoming Lokalise webhook
 * @returns Discord message as JSON object
 */
module.exports =  function Deleted(payload){
	let message =  data.raw_message
	message.embeds[0].title = "Project deleted"
	message.embeds[0].color = data.colors.removed

	message.embeds[0].fields = [{
		"name" : payload.project.name,
		"value" : "Project id" + payload.project.id,
		"inline" : false
	}]
	return message
}
