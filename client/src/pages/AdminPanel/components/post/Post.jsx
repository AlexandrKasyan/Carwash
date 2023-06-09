import React, { useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import MyModal from "../../../../components/MyModal/MyModal";
import PostEdit from "./PostEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getPosts, remove } from "../../../../http/postAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";
import { usePosts } from "../../../../hooks/useClient";
import PostFilter from "../Filter";



const Post = observer(() => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });
  const [filter, setFilter] = useState({ sort: '', query: '', search: 'id', date1: '', date2: '' });

  const sortedAndSearchPost = usePosts(posts, filter.sort, filter.query, filter.search, filter.date1, filter.date2);
  

  const createPost = async (newPost) => {
    await create(newPost.name, newPost.duties);
    await getPostList();
    setModal(false);
  }

  const removePost = async (post) => {
    remove(post.id);
  }

  const getPostList = async () => {
    const data = await getPosts(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setPosts(data.rows)
  }

  const view = (state, post) => {
    setModalEdit(state)
    setPost(post)
  }

  const editPost = (editPost) => {
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
          <PostForm create={createPost} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <PostEdit getClientList={getPostList} edit={editPost} post={post} />
        </MyModal>
        <PostFilter
          filter={filter}
          setFilter={setFilter}
          optionsSort={[
            { value: 'name', name: 'Название' },
            { value: 'duties', name: 'Обязанности' },
            { value: 'createdAt', name: 'Дата создания' },

          ]}
          optionsSearh={[
            { value: 'id', name: 'Id' },
            { value: 'name', name: 'Название' },
            { value: 'duties', name: 'Обязанности' },
            { value: 'createdAt', name: 'Дата создания' },
          ]}
        />
        <PostList remove={removePost} view={view} posts={sortedAndSearchPost} title="Должности" />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getPostList}
        />
      </Container>
    </div>
  );
})

export default Post;
