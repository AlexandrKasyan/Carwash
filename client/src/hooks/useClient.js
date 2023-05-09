import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => String(a[sort]).localeCompare(String(b[sort])))
        }

        return posts;
    }, [sort, posts])
    return sortedPosts;
}

export const usePosts = (posts, sort, query, search, date1, date2) => {
    const sortedPosts = useSortedPosts(posts, sort)
    const postsSortedByDate = useCheckDateEntrance(sortedPosts, date1, date2, sort)
    const sortedAndSearchPost = useMemo(() => {
        return postsSortedByDate.filter(post => String(post[search]).toLowerCase().includes(query.toLowerCase()))// eslint-disable-next-line
    }, [query, postsSortedByDate]);

    return sortedAndSearchPost;
}

export const useCheckDateEntrance = (posts, date1, date2, sort) => {
    if (date1 && date2 && (sort === 'createdAt' || sort === 'dateTime')) {
        console.log(date1)
        // eslint-disable-next-line
        return posts.filter((post) => {
            if (new Date(post[sort]) >= new Date(date1) && new Date(post[sort]) <= new Date(date2))
                return post
        })
    } else
        return posts
}



