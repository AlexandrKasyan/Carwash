import React from 'react';
import { Form } from "react-bootstrap";
import MySelect from '../../../components/UI/selects/MySelect';


const PostFilter = ({ filter, setFilter, options }) => {
    // useCheckDateEntrance(new Date(), '2023-04-01', '2023-05-13');
    return (
        <div >
            <div className='post-filter'>
                <MySelect
                    value={filter.sort}
                    onChange={selectSort => setFilter({ ...filter, sort: selectSort })}
                    defaultValue="Сортировать по"
                    options={options}
                />
                <div className='date-period'>
                    C
                    <Form.Control
                        className='dateTime'
                        type="date"
                        value={filter.date1}
                        onChange={event => setFilter({ ...filter, date1: event.target.value })}
                    />
                    По
                    <Form.Control
                        className='dateTime'
                        type="date"
                        value={filter.date2}
                        onChange={event => setFilter({ ...filter, date2: event.target.value })}
                    />
                </div>
            </div>

            

            <Form.Control
                value={filter.query}
                onChange={event => setFilter({ ...filter, query: event.target.value })}
                placeholder='Поиск...'
            />
        </div>
    );
};

export default PostFilter;