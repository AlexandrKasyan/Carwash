import React from 'react';
import { Form } from "react-bootstrap";


const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            {/* <MySelect
                value={filter.sort}
                onChange={selectSort => setFilter({...filter, sort: selectSort  })}
                defaultValue="Сортировать по"
                options={[
                    { value: 'email', name: 'Названию' },
                    { value: 'id', name: 'id' },
                ]}
            /> */}
            <Form.Control
                value={filter.query}
                onChange={event => setFilter({...filter , query : event.target.value})}
                placeholder='поиск...'
            />
        </div>
    );
};

export default PostFilter;