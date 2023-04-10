import React, { useState } from "react";
import OrderServiceRelationForm from "./OrderServiceRelationForm";
import OrderServiceRelationList from "./OrderServiceRelationList";
import MyModal from "../../../../components/MyModal/MyModal";
import OrderServiceRelationEdit from "./OrderServiceRelationEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getOrderServiceRelations, remove } from "../../../../http/orderServiceRelationAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";



const OrderServiceRelation = observer(() => {
  const [orderServiceRelations, setOrderServiceRelations] = useState([]);
  const [orderServiceRelation, setOrderServiceRelation] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });


  const createPost = async (newPost) => {
    await create(newPost.washServiceId, newPost.orderId);
    await getList();
    setModal(false);
  }

  const removePost = async (post) => {
    await remove(post.id);
    await getList();
  }

  const getList = async () => {
    const data = await getOrderServiceRelations(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setOrderServiceRelations(data.rows)
  }

  const view = (state, post) => {
    setModalEdit(state)
    setOrderServiceRelation(post)
  }

  const editPost = async (editPost) => {
    console.log(editPost)
    setModalEdit(false)
    await edit(editPost.id, editPost.washServiceId, editPost.orderId)
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
          <OrderServiceRelationForm create={createPost} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <OrderServiceRelationEdit getClientList={getList} edit={editPost} post={orderServiceRelation} />
        </MyModal>

        <OrderServiceRelationList remove={removePost} view={view} posts={orderServiceRelations} title="Отношение" listNameKeys={[]} />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getList}
        />
      </Container>
    </div>
  );
})

export default OrderServiceRelation;
