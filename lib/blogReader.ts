import { LOCAL_POSTS } from './data';
import { listBlogPosts, type BlogPostRecord } from './firebaseBlog';

interface CombinedPost extends BlogPostRecord {}

export async function getCombinedPosts(): Promise<CombinedPost[]> {
  const firebasePosts = await listBlogPosts();

  return [...firebasePosts, ...LOCAL_POSTS];
}