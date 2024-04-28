import express from 'express';
import { RestliClient } from 'linkedin-api-client';
import { config } from 'dotenv';

//Load the .env file in ./config/.env to get apiKeys
config({ path: './.config/.env' });
// Create a router
const router = express.Router();
const restliClient = new RestliClient();
// Load API Keys
const twitterApiKey = process.env.TWITTER_API_KEY;
const liApiKey = process.env.LI_API_KEY || '';

// Define routes
// Twitter API tweet endpoint: https://api.twitter.com/1.1/statuses/update.json
router.get('/twitter', (req,res) => {
  
});

// LinkedIn API tweet endpoint: https://api.linkedin.com/v2/ugcPosts
router.get('/li', (req,res) => {
});

// Route post to each enpoint
router.get('/all', (req,res) => {
  
});

// Export the router
export default router;
