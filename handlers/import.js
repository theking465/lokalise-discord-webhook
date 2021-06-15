const data = require("../variables.json")

/**
 * Handles Lokalise event for imports
 * Given the payload, returns an embed to be sent via Discord webhook.
 * @param {*} payload Received payload from the incoming Lokalise webhook
 * @returns Discord message as JSON object
 */
module.exports =  function Import(payload){
	let message =  data.raw_message
	message.embeds[0].title = "File imported"
	message.embeds[0].color = data.colors.added

	message.embeds[0].fields = [{
		"name" : payload.import.filename,
		"value" : "Inserted: `" + payload.import.inserted + "`\nUpdated: `" + payload.import.updated + "`\nSkipped: `" + payload.import.skipped + "`",
		"inline" : false
	}]
	return message
}

