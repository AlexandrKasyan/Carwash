import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }

        return posts;
    }, [sort, posts])

    return sortedPosts;
}

export const usePosts = (posts, sort, query) =>{
    const sortedPosts = useSortedPosts(posts, sort)

    const sortedAndSearchPost = useMemo(() => {
        return sortedPosts.filter(post => post.email.toLowerCase().includes(query))
      }, [query, sortedPosts]);
    
    return sortedAndSearchPost;
}