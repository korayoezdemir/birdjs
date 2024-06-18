const { TwitterApi } = require("twitter-api-v2");

require("dotenv").config();
console.log(process.env.CLIENT_ID);


class TwitterClient {
  constructor() {
    this.client = new TwitterApi({
      appKey: process.env.API_KEY,
      appSecret: process.env.API_SECRET,
      accessToken: process.env.ACCESS_TOKEN,
      accessSecret: process.env.ACCESS_SECRET,
    });

    this.bearer = new TwitterApi(process.env.BEARER_TOKEN);

    this.twitterClient = this.client.readWrite;
    this.twitterBearer = this.bearer.readOnly;
  }
}

module.exports = TwitterClient;
