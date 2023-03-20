import React from 'react';
import { Button } from 'react-bootstrap';
import { getPagesArray } from '../../../../utils/pages';


const Pages = ({postTotalPages, page, changePage}) => {
    let pagesArray = getPagesArray(postTotalPages)
    
    return (
        <div >
            {pagesArray.map(p =>
                <Button
                    className={page === p ? "page__current page__button" : 'page__button'}
                    onClick={() => changePage(p)}
                    key={p}
                >
                    {p}
                </Button>
            )}
        </div>
    );
};

export default Pages;