const data = require("../variables.json")

/**
 * Handles all Lokalise events about languages
 * Given the payload, returns an embed to be sent via Discord webhook.
 * @param {*} payload Received payload from the incoming Lokalise webhook
 * @returns Discord message as JSON object
 */
module.exports =  function Language(payload){
	let message = data.raw_message

	if(payload.event.includes("added")){
		message.embeds[0].color = data.colors.added
		message.embeds[0].title = "Languages added"
		let fields = []
		for (lang of payload.languages) {
			fields.push({
				"name" : lang.name,
				"value" : "Language code `" + lang.iso + "`\nLanguage id `" + lang.id + "`",
				"inline" : true
			})
		}
		message.embeds[0].fields = fields
	}else if(payload.event.includes("removed")){
		message.embeds[0].color = data.colors.removed
		message.embeds[0].title = "Language removed"
		message.embeds[0].fields = [{
			"name" : payload.language.name,
			"value" : "Language code `" + payload.language.iso + "`\nLanguage id `" + payload.language.id + "`",
			"inline" : false
		}]
	}else if(payload.event.includes("settings_changed")){
		message.embeds[0].color = data.colors.modified
		message.embeds[0].title = "Language settings changed"
		message.embeds[0].fields = [{
			"name" : payload.language.name,
			"value" : "Language code `" + payload.language.iso + "`\nLanguage id `" + payload.language.id + "`",
			"inline" : false
		}]
	}else{
		return undefined
	}
	return message
}

