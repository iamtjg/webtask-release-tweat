# Webtask GitHub Release Tweet

Utilizes https://webtask.io to send out a tweet on a new release to a GitHub project.

The webtask will send out a tweet for each published release of the master branch of the project.

# Setup
There are 3 components to this setup:
- The webtask
- GitHub webhook
- Twitter Account / App

## Webtask
Take the file `release-tweet.js` and create a new webtask on https://webtask.io with it. Webtask will walk through getting set up if you have not used it before.

## GitHub Webhook
Once you have you webtask created you will need to set up a webhook in the repository/repositories you want release tweets to go out for.

To set up a webhook go to the Settings for you repository and select WebHooks. Click the 'Add webhook' button.
- In the `Payload URL` field enter the URL for your webtask
- Change the `Content Type` to `application/json`
- Create a `Secret` key to be used when sending a request to your webtask.  This will be used to verify the request came from a repo you have set up and not just a random one.
- For `Which events would you like to trigger this webhook?`, select `Let me select individual events` and make sure only `Release` is checked.
- Click Add webhook

To learn more about GitHub webhooks in general refer to https://developer.github.com/webhooks/.

## Twitter Account / App
You will need to create a Twitter Application for the account you want to send the tweets.  See https://dev.twitter.com/overview/documentation and https://apps.twitter.com for creating and documentation on Twitter apps.

Let us assume you have created a new Twitter app under the account of your choosing.  For the app to reply to tweets make sure that is has Read and Write access.  Without Write access it will not be able send tweets from the account.
- On https://apps.twitter.com, select your app
- Go to the permissions tab for the app and select at least 'Read and Write'
- If you update your settings you must regenerate your keys as they are tied to the access type.  The access level that applies to your current keys is listed with them.


## Back to the Webtask
Head back to your webtask and make sure you have the following information at hand:
- Twitter Consumer Key
- Twitter Consumer Secret
- Twitter Access Token
- Twitter Access Token Secret
- Secret key you set on your GitHub webhook

In your webtask set the following Secrets:
- `CONSUMERKEY`: Twitter Consumer Key
- `CONSUMERSECRET`: Twitter Consumer Secret
- `ACCESSTOKEN`: Twitter Access Token
- `ACCESSTOKENSECRET`: Twitter Access Token Secret
- `HOOKSECRET`: Secret for GitHub webhook
