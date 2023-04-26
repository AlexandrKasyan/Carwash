import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getPagesArray } from '../../../../utils/pages';


const Pages = observer( ({postTotalPages, page, changePage, getList}) => {
    let pagesArray = getPagesArray(postTotalPages)

    useEffect(() => {
        getList()
      }, [page])// eslint-disable-line react-hooks/exhaustive-deps

    if(pagesArray.length<=1){
        return (<div></div>)
    }
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
})

export default Pages;