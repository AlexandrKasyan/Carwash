import React, { useState } from "react";
import ClientCarForm from "./ClientCarForm";
import ClientCarList from "./ClientCarList";
import MyModal from "../../../../components/MyModal/MyModal";
import ClientCarEdit from "./ClientCarEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getClientCars, remove } from "../../../../http/clientCarAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";



const ClientCar = observer(() => {
  const [clientCars, setClientCars] = useState([]);
  const [clientCar, setClientCar] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });


  const createClientCar = async (newPost) => {
    await create(newPost.clientId, newPost.carId);
    await getClientCarList();
    setModal(false);
  }

  const removePost = async (post) => {
    await remove(post.id);
    await getClientCarList();
  }

  const getClientCarList = async () => {
    const data = await getClientCars(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setClientCars(data.rows)
  }

  const view = (state, post) => {
    setModalEdit(state)
    setClientCar(post)
  }

  const editClientCar = (editPost) => {
    edit(editPost.id, editPost.clientId, editPost.carId)
    setModalEdit(false)
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
          <ClientCarForm create={createClientCar} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <ClientCarEdit getClientList={getClientCarList} edit={editClientCar} post={clientCar} />
        </MyModal>

        <ClientCarList remove={removePost} view={view} posts={clientCars} title="Машины клиентов" listNameKeys={[]} />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getClientCarList}
        />
      </Container>
    </div>
  );
})

export default ClientCar;
