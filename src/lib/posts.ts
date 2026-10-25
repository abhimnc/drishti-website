import { queryOptions } from "@tanstack/react-query";
import { getPublicPosts } from "./posts.functions";
export const publicPostsOptions = queryOptions({ queryKey: ["public-posts"], queryFn: () => getPublicPosts(), staleTime: 60000 });
export type PublicPost = Awaited<ReturnType<typeof getPublicPosts>>[number];