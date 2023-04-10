import React, { useState } from "react";
import BodyForm from "./BodyForm";
import BodyList from "./BodyList";
import MyModal from "../../../../components/MyModal/MyModal";
import BodyEdit from "./BodyEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getBodies, remove } from "../../../../http/bodyAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";



const Body = observer(() => {
  const [bodies, setBodies] = useState([]);
  const [body, setBody] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });


  const createBody = async (newPost) => {
    await create(newPost.name);
    await getBodies();
    setModal(false);
  }

  const removeBody = async (post) => {
    remove(post.id);
  }

  const getBodyList = async () => {
    const data = await getBodies(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setBodies(data.rows)
  }

  const view = (state, post) => {
    setModalEdit(state)
    setBody(post)
  }

  const editBody = (editPost) => {
    edit(editPost.id, editPost.name, editPost.duties)
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
          <BodyForm create={createBody} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <BodyEdit getClientList={getBodyList} edit={editBody} post={body} />
        </MyModal>

        <BodyList remove={removeBody} view={view} posts={bodies} title="Кузова" />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getBodyList}
        />
      </Container>
    </div>
  );
})

export default Body;
