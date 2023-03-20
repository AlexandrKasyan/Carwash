export const getPagesCount = (postTotalCount, limit) => {
    return Math.ceil(postTotalCount/limit);
}

export const getPagesArray = (postTotalPages) => {
    let pagesArray = [];
    for (let i = 0; i < postTotalPages; i++)
      pagesArray.push(i + 1);
    
    return pagesArray;
}