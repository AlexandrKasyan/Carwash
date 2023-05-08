import React, { useState } from "react";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";
import MyModal from "../../../../components/MyModal/MyModal";
import OrderEdit from "./OrderEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getOrders, remove } from "../../../../http/orderAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";
import PostFilter from "../Filter";



const Order = observer(() => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });
  const [filter, setFilter] = useState({ sort: '', query: '', date1: '', date2: '' });



  const createPost = async (newPost) => {
    await create(newPost.dateTime, newPost.generalPrice, newPost.statusId, newPost.clientId);
    await getList();
    setModal(false);
  }

  const removePost = async (post) => {
    await remove(post.id);
    await getList();
  }

  const getList = async () => {
    const data = await getOrders(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setOrders(data.rows)
  }

  const view = (state, post) => {
    setModalEdit(state)
    setOrder(post)
  }

  const editPost = async (editPost) => {
    console.log(editPost)
    setModalEdit(false)
    await edit(editPost.id, editPost.dateTime, editPost.generalPrice, editPost.statusId, editPost.clientId)
    await getList();
  }

  const changePage = (p) => {
    setQueryParams({ ...queryParams, page: p })
  }

  return (
    <div className="admin-panel">
      <NavAdmin />
      <Container className="admin-content">
        <Button onClick={() => setModal(true)}>Создать запись</Button>

        <MyModal
          visible={modal}
          setVisible={setModal}
        >
          <OrderForm create={createPost} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <OrderEdit getClientList={getList} edit={editPost} post={order} />
        </MyModal>
        <PostFilter
          filter={filter}
          setFilter={setFilter}
          options={[
            { value: 'email', name: 'email' },
            { value: 'name', name: 'Имени' },
            { value: 'createdAt', name: 'Дате' },
          ]}
        />
        <OrderList remove={removePost} view={view} posts={orders} title="Заказы" listNameKeys={[]} />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getList}
        />
      </Container>
    </div>
  );
})

export default Order;
