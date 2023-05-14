import React, { useState } from "react";
import PostForm from "./UserForm";
import UserList from "./UsersList";
import PostFilter from "../Filter";
import MyModal from "../../../../components/MyModal/MyModal";
import { usePosts } from "../../../../hooks/useClient";
import PostEdit from "./UserEdit";
import { Button, Container} from "react-bootstrap";
import { create, edit, getUsers, remove } from "../../../../http/userAPI";
import { getRoles } from "../../../../http/roleAPI";
import { getCarWashes } from "../../../../http/carWashAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../../components/NavAdmin";


const Users = observer(() => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [washes, setWashes] = useState([]);
  const [user, setUser] = useState({});
  const [filter, setFilter] = useState({ sort: '', query: '', search: 'id', date1: '', date2: '' });
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });


  const createUser = async (newPost) => {
    await create(newPost.email, newPost.password, newPost.roleId, newPost.carWashId);
    await getUserList();
    setModal(false);
  }

  const sortedAndSearchPost = usePosts(users, filter.sort, filter.query, filter.search, filter.date1, filter.date2);

  const removePost = async (post) => {
    await remove(post.id);
    await getUserList();
  }

  const getUserList = async () => {
    const data = await getUsers(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    await getRolesList();
    await getWashesList();
    setUsers(data.rows)
  }

  const getRolesList = async () => {
    const data = await getRoles()
    setRoles(data.rows)
  }

  const getWashesList = async () => {
    const data = await getCarWashes();
    setWashes(data.rows)
  }


  const view = (state, post) => {
    setModalEdit(state)
    setUser(post)
  }

  const editUser = async (editPost) => {
    edit(editPost.id, editPost.email, editPost.password, editPost.roleId, editPost.carWashId)
    setModalEdit(false)
    getUserList();
  }

  const changePage = (p) => {
    setQueryParams({ ...queryParams, page: p })
  }

  return (
    <div className="admin-panel">
      <NavAdmin  />
      <Container className="admin-content" >
        <Button onClick={() => setModal(true)}>Создать запись</Button>

        <MyModal
          visible={modal}
          setVisible={setModal}
        >
          <PostForm create={createUser} washes={washes} roles={roles} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <PostEdit edit={editUser} post={user} roles={roles} washes={washes}/>
        </MyModal>
        <PostFilter
          filter={filter}
          setFilter={setFilter}
          optionsSort={[
            { value: 'email', name: 'Email' },
            { value: 'roleId', name: 'Роли' },
            { value: 'createdAt', name: 'Дате регистрации' },
          ]}
          optionsSearh={[
            { value: 'id', name: 'ID' },
            { value: 'email', name: 'Название' },
          ]}
        />
        <UserList remove={removePost} washes={washes} roles={roles} view={view} posts={sortedAndSearchPost} title="Пользователи" listNameKeys={[]} />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getUserList}
        />
      </Container>
    </div>
  );
})

export default Users;
