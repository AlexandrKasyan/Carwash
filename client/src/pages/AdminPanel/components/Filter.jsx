import React from 'react';
import { Form } from "react-bootstrap";
import MySelect from '../../../components/UI/selects/MySelect';


const PostFilter = ({ filter, setFilter,  optionsSort, optionsSearh }) => {
    // useCheckDateEntrance(new Date(), '2023-04-01', '2023-05-13');
    return (
        <div >
            <div className='post-filter'>
                <MySelect
                    value={filter.sort}
                    onChange={selectSort => setFilter({ ...filter, sort: selectSort })}
                    defaultValue="Сортировать по"
                    options={optionsSort}
                />
                <div className='date-period'>
                    C
                    <Form.Control
                        className='dateTime'
                        type={
                            filter.sort === 'dateTime' ?
                                'datetime-local' :
                                'date'
                        }
                        value={filter.date1}
                        onChange={event => setFilter({ ...filter, date1: event.target.value })}
                    />
                    По
                    <Form.Control
                        className='dateTime'
                        type={
                            filter.sort === 'dateTime' ?
                                'datetime-local' :
                                'date'
                        }
                        value={filter.date2}
                        onChange={event => setFilter({ ...filter, date2: event.target.value })}
                    />
                </div>
            </div>


            <div className='post-search'>
                <Form.Control
                    value={filter.query}
                    onChange={event => setFilter({ ...filter, query: event.target.value })}
                    placeholder='Поиск...'
                />
                <MySelect
                    value={filter.search}
                    onChange={selectSort => setFilter({ ...filter, search: selectSort })}
                    defaultValue="Поиск по"
                    options={optionsSearh}
                />
            </div>
        </div>
    );
};

export default PostFilter;