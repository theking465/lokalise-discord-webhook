const data = require("../variables.json")

/**
 * Handles Lokalise event for exports
 * Given the payload, returns an embed to be sent via Discord webhook.
 * @param {*} payload Received payload from the incoming Lokalise webhook
 * @returns Discord message as JSON object
 */
module.exports =  function Export(payload){
	console.log(data)
	let message =  data.raw_message
	message.embeds[0].title = "Project exported"
	message.embeds[0].color = data.colors.added

	message.embeds[0].fields = [{
		"name" : "Type: `" + payload.export.type + "`",
		"value" : "Filename: `" + payload.export.filename + "`\nPlatform: " + payload.export.platform + "`",
		"inline" : false
	}]
	return message
}

