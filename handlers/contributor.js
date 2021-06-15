const data = require("../variables.json")

/**
 * Handles all Lokalise events about Contributors
 * Given the payload, returns an embed to be sent via Discord webhook.
 * @param {*} payload Received payload from the incoming Lokalise webhook
 * @returns Discord message as JSON object
 */
module.exports =  function Contributor(payload){
	let message = data.raw_message

	if(payload.event.includes("deleted")){
		message.embeds[0].color = data.colors.removed
		message.embeds[0].title = "Contributor removed"
		if(data.privacy.show_contributor_email) {
			message.embeds[0].fields = [{
				"name" : "Contributor email",
				"value" : "||`" + payload.contributor.email + "`||",
				"inline" : false
			}]
		}else{
			message.embeds[0].fields = [{
				"name" : "Contributor email",
				"value" : "Not shown due to privacy settings.",
				"inline" : false
			}]
		}
	}else if(payload.event.includes("added")){
		message.embeds[0].color = data.colors.added
		message.embeds[0].title = "Contributor added"
		if(data.privacy.show_contributor_email) {
			message.embeds[0].fields = [{
				"name" : "Contributor email",
				"value" : "||`" + payload.contributor.email + "`||",
				"inline" : false
			}]
		}else{
			message.embeds[0].fields = [{
				"name" : "Contributor email",
				"value" : "Not shown due to privacy settings.",
				"inline" : false
			}]
		}
	}else{
		return undefined
	}
	return message
}

