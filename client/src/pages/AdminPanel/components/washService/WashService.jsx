import React, { useState } from "react";
import WashServiceForm from "./WashServiceForm";
import WashServiceList from "./WashServiceList";
import MyModal from "../../../../components/MyModal/MyModal";
import WashServiceEdit from "./WashServiceEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getWashServices, remove } from "../../../../http/washServiceAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";



const WashService = observer(() => {
  const [washServices, setWashServices] = useState([]);
  const [washService, setWashService] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });


  const createPost = async (newPost) => {
    await create(newPost);
    await getList();
    setModal(false);
  }

  const removePost = async (post) => {
    await remove(post.id);
    await getList();
  }

  const getList = async () => {
    const data = await getWashServices(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setWashServices(data.rows)
  }

  const view = (state, post) => {
    setModalEdit(state)
    setWashService(post)
  }

  const editPost = async (editPost) => {
    setModalEdit(false)
    await edit(editPost)
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
          <WashServiceForm create={createPost} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <WashServiceEdit getClientList={getList} edit={editPost} post={washService} />
        </MyModal>

        <WashServiceList remove={removePost} view={view} posts={washServices} title="Услуги" listNameKeys={[]} />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getList}
        />
      </Container>
    </div>
  );
})

export default WashService;
