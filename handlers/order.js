const data = require("../variables.json")

/**
 * Handles all Lokalise events about Orders
 * Given the payload, returns an embed to be sent via Discord webhook.
 * @param {*} payload Received payload from the incoming Lokalise webhook
 * @returns Discord message as JSON object
 */
module.exports =  function Order(payload){
	let message = data.raw_message

	if(payload.event === "team.order.created"){
		message.embeds[0].color = data.colors.added
		message.embeds[0].title = "Order created"
		message.embeds[0].fields = [{
			"name" : payload.order.id,
			"value" : payload.order.provider + " `" + payload.order.currency + " " + payload.order.total + "`",
			"inline" : false
		}]
		
	}else if(payload.event.includes("completed")){
		message.embeds[0].color = data.colors.added
		message.embeds[0].title = "Order completed"
		message.embeds[0].fields = [{
			"name" : payload.order.id,
			"value" : payload.order.provider,
			"inline" : false
		}]
	}
	else if(payload.event.includes("deleted")){
		message.embeds[0].color = data.colors.removed
		message.embeds[0].title = "Order deleted"
		message.embeds[0].fields = [{
			"name" : payload.project.name,
			"value" : payload.project.id,
			"inline" : false
		}]
	}else{
		return undefined
	}
	return message
}

