import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Dropdown, Form } from "react-bootstrap";
import { getBodies } from '../../../../http/bodyAPI';
import { getBrands } from '../../../../http/brandAPI';


const CarForm = ({ create }) => {
    const [post, setPost] = useState({ number: '', yearRelease: '', bodyId: '', carBrandId: '' });
    const [brand, setBrand] = useState({});
    const [body, setBody] = useState({});
    const [brands, setBrands] = useState([]);
    const [bodyes, setBodyes] = useState([]);



    useEffect(() => {
        const getData = async () => {
            const bodiesList = await getBodies()
            setBodyes(bodiesList.rows)
            const brandsList = await getBrands(100, 1)
            setBrands(brandsList.rows)
        }
        getData()

    }, [])


    const addNewPost = (e) => {
        if (post.number && post.yearRelease && body.id && brand.id) {
            e.preventDefault();
            create({ number: post.number, yearRelease: post.yearRelease, bodyId: body.id, carBrandId: brand.id });
            setPost({ number: '', yearRelease: '', bodyId: '', carBrandId: '' });
        }

    }
    return (
        <div>
            <form>
                Номер автомобиля
                <Form.Control
                    type="text"
                    placeholder="Номер"
                    onChange={e => setPost({ ...post, number: e.target.value })}
                    value={post.number}
                />
                Год выпуска автомобиля
                <Form.Control
                    type="text"
                    placeholder="Год выпуска"
                    onChange={e => setPost({ ...post, yearRelease: e.target.value })}
                    value={post.yearRelease}
                />

                <Dropdown className="mt-2 mb-2" >
                    <Dropdown.Toggle>{body.name || "Выберите кузов"}</Dropdown.Toggle>
                    <Dropdown.Menu className='select-menu'>
                        {bodyes.map(bodyEl =>
                            <Dropdown.Item
                                onClick={() => setBody(bodyEl)}
                                key={bodyEl.id}
                            >
                                {bodyEl.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-2 mb-2" >
                    <Dropdown.Toggle>{brand.name || "Выберите марку"}</Dropdown.Toggle>
                    <Dropdown.Menu className='select-menu'>
                        {brands.map(brandEl =>
                            <Dropdown.Item
                                onClick={() => setBrand(brandEl)}
                                key={brandEl.id}
                            >
                                {brandEl.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default CarForm;