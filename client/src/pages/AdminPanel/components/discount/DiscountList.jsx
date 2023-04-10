import React from 'react';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import MyModal from '../../../../components/MyModal/MyModal';

const DiscountList = ({ posts, title, remove, view }) => {
    const [modal, setModal] = useState(false);
    const [discount, setDiscount] = useState({});

    if (!posts.length) {
        return <h1 style={{ textAlign: 'center' }} >Таблица скидок пуста</h1>
    }
    return (
        <div>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <div>
                <h2>Информация</h2>
                    <p>Id: {discount.id}</p>
                    <p>Название: {discount.name}</p>
                    <p>Количесво посещений: {discount.numberVisits}</p>
                    <p>Процент скидки: {discount.discountPercentage}</p>
                    <p>Создано: {discount.createdAt}</p>
                    <p>Обновлено: {discount.updatedAt}</p>

                    <Button onClick={() => {
                        remove(discount)
                        setModal(false)
                        }}>Удалить</Button>
                    <Button onClick={() => {
                        view(true, discount)
                        setModal(false)
                    }}>Обновить</Button>
                </div>
            </MyModal>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Название</th>
                        <th>Количесво посещений</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post) =>
                            <tr
                                onClick={() => {
                                    setDiscount(post)
                                    setModal(true)
                                }}
                                key={post.id}>
                                <td>{post.id}.</td>
                                <td>{post.name}</td>
                                <td>{post.numberVisits}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default DiscountList;