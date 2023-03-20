import React, { useState, useRef } from "react";
import PostForm from "./ClientForm";
import PostList from "./ClientList";
import PostFilter from "../../Filter";
import MyModal from "../../../../components/MyModal/MyModal";
import { usePosts } from "../../../../hooks/usePosts";
import Pagination from "../../../../components/UI/buttons/pagination/Pagination";
import PostEdit from "./ClientEdit";
import { Button } from "react-bootstrap";
import { create, edit, getUsers, remove } from "../../../../http/userAPI";


function Posts() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [postTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 10, page: 1 });
  const lastElement = useRef();
  // const [listNameKeys, setListNameKeys] = useState([]);
  
  const createPost = async (newPost) => {
    await create(newPost.email, newPost.password, newPost.roleId);
    await getPosts();
    setModal(false);
  }

  const sortedAndSearchPost = usePosts(posts, filter.sort, filter.query);

  const removePost = async (post) => {
    remove(post.id);
    await getPosts();
  }

  const getPosts = async () => {
    const data = await getUsers()
    setPosts(data.rows)
  }

  const view = (state, post) =>{
    setModalEdit(state)
    setPost(post) 
  }

  const editPost = (editPost) => {
    edit(editPost.id, editPost.email, editPost.password, editPost.roleId)
    setModalEdit(false)
    setPost({title: "", body: ""})
  }

  const changePage = (p) => {
    setQueryParams({ ...queryParams, page: p })
  }

  return (
    <div className="App">
     
      <Button onClick={() => getPosts()}>Обновить</Button>
      <Button onClick={() => setModal(true)}>Создать запись</Button>

      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createPost} />
      </MyModal>
      <MyModal
        visible={modalEdit}
        setVisible={setModalEdit}
      >
       <PostEdit edit={editPost} post={post}/>
      </MyModal>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <PostList remove={removePost} view={view} posts={sortedAndSearchPost} title="Пользователи" listNameKeys = {[]} />
      <div ref={lastElement} style={{ height: 20 }}></div>

      <Pagination
        postTotalPages={postTotalPages}
        page={queryParams.page}
        changePage={changePage}
      />

    </div>
  );
}

export default Posts;
