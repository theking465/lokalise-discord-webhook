# Lokalise-Discord-Webhook

Webhook redirecter written in nodejs using express to redirect webhooks received from Lokalise to Discord. 
When receiving a POST request from Lokalise it sends an embed to a Discord webhook with all the information from the Lokalise request.

## Examples 

![example](example.png)

## How to install

Clone the repository

	git clone https://github.com/theking465/lokalise-discord-webhook.git

Install dependencies

	npm install

Rename `.env.example` to `.env` and fill in your PORT and receiving discord webhook.

Setup the Lokalise webhook at project -> integrations -> webhooks. The webhook url is the url where you will host this server. 


Start the server

	npm start

## Customization 

The embeds can be customized. The color scheme can be adapted in `variables.json[colors]`. The values are integers in decimal form of a hex code. 

You can toggle if the user their email is showed in `variables.json[privacy]`.

## How to contribute

Issues and PRs are always welcome for any feature request or bug report. 
When opening a pull request, make sure it follows the eslint configuration.

