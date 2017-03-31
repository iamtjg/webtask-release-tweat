module.exports = function (context, callback) {
  const crypto = require('crypto');
  const Twit = require('twit');
  const repo = context.data.repository;
  const release = context.data.release;

  const T = new Twit({
    consumer_key:         context.data.CONSUMERKEY,
    consumer_secret:      context.data.CONSUMERSECRET,
    access_token:         context.data.ACCESSTOKEN,
    access_token_secret:  context.data.ACCESSTOKENSECRET
  });
  
  /**
  * Request must meet criteria:
  *   Be from GitHub webhook user-agent
  *   Verified to be from repo based on message signature
  *   Not a prerelease
  *   Release for master branch
  */
  if (!context.headers['user-agent'].startsWith('GitHub-Hookshot')) {
    return callback(null, 'invalid request');
  }
  
  /**
   * The GiHub x-hub-signature is a HMAC digest of the request payload using the webhook secret as the key
   */
  const shasum = crypto.createHash('sha1');
  const wt_sig = crypto.createHmac('sha1', context.data.HOOKSECRET).update(context.body_raw).digest('hex');
  const hub_sig = context.headers['x-hub-signature'];
  
  if (hub_sig !== 'sha1='+ wt_sig) {
    return callback(null, 'invalid request');
  }
  if (context.headers['x-github-event'] === 'ping' ) {
    return callback(null, 'Ping success');
  }
  if (release.prerelease === true) {
    return callback(null, 'invalid request');
  }
  if (release.target_commitish !== 'master') {
    return callback(null, 'invalid request');
  }
  
  T.post('statuses/update', { status: `New release from ${repo.name}! ${release.tag_name} ${release.name} ${release.html_url}` }, function(err, data, response) {
    if (err) {
      console.log(err);
    }
  });
  
  callback(null, 'tweeted release');
}
