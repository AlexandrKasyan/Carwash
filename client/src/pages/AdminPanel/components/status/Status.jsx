import React, { useState } from "react";
import StatusForm from "./StatusForm";
import StatusList from "./StatusList";
import MyModal from "../../../../components/MyModal/MyModal";
import StatusEdit from "./StatusEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getStatuses, remove } from "../../../../http/statusAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";



const Status = observer(() => {
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });


  const createPost = async (newPost) => {
    await create(newPost.name);
    await getList();
    setModal(false);
  }

  const removePost = async (post) => {
    await remove(post.id);
    await getList();
  }

  const getList = async () => {
    const data = await getStatuses(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setStatuses(data.rows)
  }

  const view = (state, post) => {
    setModalEdit(state)
    setStatus(post)
  }

  const editPost = async (editPost) => {
    setModalEdit(false)
    await edit(editPost.id, editPost.name)
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
          <StatusForm create={createPost} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <StatusEdit getClientList={getList} edit={editPost} post={status} />
        </MyModal>

        <StatusList remove={removePost} view={view} posts={statuses} title="Статусы" listNameKeys={[]} />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getList}
        />
      </Container>
    </div>
  );
})

export default Status;
