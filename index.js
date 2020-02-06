require("dotenv").config()
const { createEventAdapter } = require("@slack/events-api")
const { WebClient } = require("@slack/web-api")

const web = new WebClient(process.env.SLACK_TOKEN)
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET)
const port = process.env.PORT || 3000

slackEvents.on("message", event => {
    if (event.user && event.user !== "UT7PHTKUK") {
        web.chat.postMessage({
            channel: event.channel,
            text:
                "It's a ghost town in here! Please post this message over in the new V School Slack workspace. Join with this link if you haven't already:\n\n https://join.slack.com/t/v-school/shared_invite/enQtNDc0MzQ4NzIwODM0LWE3ZDJhYzk5MDU5MDRjM2VjZTRjYzExMDgwMzQ5NDcwMTJhMDk2NWNhZGExZjkzOGExZDUyNzUyM2E3NjkwNzk\n\nhttps://media.giphy.com/media/CJN2cdXD51Q2c/giphy.gif"
        }).then(res => console.log(res.ts))
    }
})

slackEvents.on("error", console.error)

slackEvents.start(port).then(() => {
    // Listening on path '/slack/events' by default
    console.log(`server listening on port ${port}`)
})
