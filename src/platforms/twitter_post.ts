import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID || '',
  clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
});

const bearer = new TwitterApi(process.env.TWITTER_BEARER_TOKEN || '');
function auth(){};

export const twitter_callback_url = "http://127.0.0.1:3000/callback/";
export const twitter_client = client.readWrite;
export const twitter_bearer = bearer.readOnly;
