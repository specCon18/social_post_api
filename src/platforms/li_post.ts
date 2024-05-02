import { RestliClient } from 'linkedin-api-client';

const USERINFO_ENDPOINT = '/userinfo';
const POSTS_ENDPOINT = '/posts';
const API_VERSION = process.env.LI_API_VERSION || '';
const API_KEY = process.env.LI_API_KEY || '';

export async function post_to_li(): Promise<void> {
  const restliClient = new RestliClient();
  restliClient.setDebugParams({ enabled: true });

  const meResponse = await restliClient.get({
    resourcePath: USERINFO_ENDPOINT,
    accessToken: API_KEY
  });

  const postsCreateResponse = await restliClient.create({
    resourcePath: POSTS_ENDPOINT,
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
    accessToken:API_KEY,
    versionString: API_VERSION
  });

  console.log(postsCreateResponse.createdEntityId);
}
