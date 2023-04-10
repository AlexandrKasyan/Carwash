import React, { useState } from "react";
import RoleForm from "./RoleForm";
import RoleList from "./RoleList";
import MyModal from "../../../../components/MyModal/MyModal";
import RoleEdit from "./RoleEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getRoles, remove } from "../../../../http/roleAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";




const Role = observer(() => {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });


  const createCarWash = async (newPost) => {
    await create(newPost.role);
    await getRolesList();
    setModal(false);
  }


  const removePost = async (post) => {
    remove(post.id);
    await getRolesList();
  }

  const getRolesList = async () => {
    const data = await getRoles(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setRoles(data.rows)
  }

  const view = (state, post) => {
    setModalEdit(state)
    setRole(post)
  }

  const editRole = (editPost) => {
    edit(editPost.id, editPost.role)
    setModalEdit(false)
    setRole({ title: "", body: "" })
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
          <RoleForm create={createCarWash} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <RoleEdit getClientList={getRolesList} edit={editRole} post={role} />
        </MyModal>

        <RoleList remove={removePost} view={view} posts={roles} title="Роли" listNameKeys={[]} />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getRolesList}
        />
      </Container>
    </div>
  );
})

export default Role;
