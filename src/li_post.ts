/**
 * Example calls to create a post on LinkedIn. This requires a member-based token with the following
 * scopes (r_liteprofile, w_member_social), which is provided by the Sign in with LinkedIn and Share on LinkedIn
 * API products.
 *
 * The steps include:
 * 1. Fetching the authenticated member's profile to obtain the member's identifier (a person URN)
 * 2. Create a post using /posts endpoint
 *
 * To view these posts, go to linkedin.com and click Me > Posts & Activity.
 *
 * BEWARE: This will make an actual post to the main feed which is visible to anyone.
 */

import { RestliClient } from 'linkedin-api-client';
import dotenv from 'dotenv';

dotenv.config({ path: './.config/.env' });

const USERINFO_RESOURCE = '/userinfo';
const POSTS_RESOURCE = '/posts';
const API_VERSION = '202401';

async function main(): Promise<void> {
  const restliClient = new RestliClient();
  restliClient.setDebugParams({ enabled: true });
  const accessToken = process.env.LI_API_KEY || '';

  const meResponse = await restliClient.get({
    resourcePath: USERINFO_RESOURCE,
    accessToken
  });
  console.log(meResponse.data);

  /**
   * Calling the newer, more streamlined (and versioned) /posts API to create
   * a text post on behalf of the authenticated member.
   */
  const postsCreateResponse = await restliClient.create({
    resourcePath: POSTS_RESOURCE,
    entity: {
      author: `urn:li:person:${meResponse.data.sub}`,
      lifecycleState: 'PUBLISHED',
      visibility: 'PUBLIC',
      commentary: 'Sample text post created with /posts API',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: []
      }
    },
    accessToken,
    versionString: API_VERSION
  });
  // This is the created share URN
  console.log(postsCreateResponse.createdEntityId);
}

main()
  .then(() => {
    console.log('Completed');
  })
  .catch((error) => {
    console.log(`Error encountered: ${error.message}`);
  });
