import React, { useState, useRef } from "react";
import PostForm from "./UserForm";
import PostList from "./UsersList";
import PostFilter from "../Filter";
import MyModal from "../../../../components/MyModal/MyModal";
import { usePosts } from "../../../../hooks/usePosts";
import PostEdit from "./UserEdit";
import { Button } from "react-bootstrap";
import { create, edit, getUsers, remove } from "../../../../http/userAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";


const Users = observer(() => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });

  
  const createUser = async (newPost) => {
    await create(newPost.email, newPost.password, newPost.roleId);
    await getUserList();
    setModal(false);
  }

  const sortedAndSearchPost = usePosts(users, filter.sort, filter.query);

  const removePost = async (post) => {
    remove(post.id);
    await getUserList();
  }

  const getUserList = async () => {
    const data = await getUsers(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setUsers(data.rows)
  }

  const view = (state, post) =>{
    setModalEdit(state)
    setUser(post) 
  }

  const editUser = (editPost) => {
    edit(editPost.id, editPost.email, editPost.password, editPost.roleId)
    setModalEdit(false)
    setUser({title: "", body: ""})
  }

  const changePage = (p) => {
    setQueryParams({ ...queryParams, page: p })
    getUserList()
  }

  return (
    <div className="App">
     
      <Button onClick={() => getUserList()}>Обновить</Button>
      <Button onClick={() => setModal(true)}>Создать запись</Button>

      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createUser} />
      </MyModal>
      <MyModal
        visible={modalEdit}
        setVisible={setModalEdit}
      >
       <PostEdit edit={editUser} post={user}/>
      </MyModal>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <PostList remove={removePost} view={view} posts={sortedAndSearchPost} title="Пользователи" listNameKeys = {[]} />
      

      <Pages
        postTotalPages={totalPages} page = {queryParams.page} changePage = {changePage}
      />
    </div>
  );
})

export default Users;
