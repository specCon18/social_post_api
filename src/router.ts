import {Router,Request,Response} from 'express';
import {post_to_li} from './platforms/li_post.js'
import {twitter_client} from './platforms/twitter_post.js';

// Create a router
const router = Router();

// Endpoints to post to twitter
//TODO: accept MD as input and convert to non-formatted text as Twitter is dumb and doesn't allow formatting in posts
router.post('/twitter/tweet', (req: Request, res: Response) => {});
router.get('/twitter/callback',(req:Request,res:Response) => {});

//Endpoints for surrealdb
/// Endpoints for the User Table
router.post('/db/user/create', (req:Request,res:Response) => {});
router.get('/db/user/read', (req:Request,res:Response) => {});
router.patch('/db/user/update', (req:Request,res:Response) => {});
router.delete('/db/user/delete', (req:Request,res:Response) => {});
/// Endpoints for the Account Table
router.post('/db/account/create', (req:Request,res:Response) => {});
router.get('/db/account/read', (req:Request,res:Response) => {});
router.patch('/db/account/update', (req:Request,res:Response) => {});
router.delete('/db/account/delete', (req:Request,res:Response) => {});

// Endpoint to post to linkedin
//TODO: accept MD as input and convert to non-formatted text as LinkedIn is dumb and doesn't allow formatting in posts
router.post('/linkedin/post', (req: Request, res: Response) => {
  post_to_li().then(() => {console.log('Completed');}).catch((error) => {console.log(`Error encountered: ${error.message}`);});
});

// Export the router
export default router;
