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

export const usePosts = (posts, sort, query, date1, date2) => {
    const sortedPosts = useSortedPosts(posts, sort)
    const postsSortedByDate = useCheckDateEntrance(sortedPosts, date1, date2)

    const sortedAndSearchPost = useMemo(() => {
        return postsSortedByDate.filter(post => post.name.toLowerCase().includes(query.toLowerCase()))
    }, [query, postsSortedByDate]);

    return sortedAndSearchPost;
}

export const useCheckDateEntrance = (posts, date1, date2) => {
    if (date1 && date2)
        // eslint-disable-next-line
        return posts.filter((post) => {
            if (new Date(post.createdAt) >= new Date(date1) && new Date(post.createdAt) <= new Date(date2))
                return post
        })
    else
        return posts
}



