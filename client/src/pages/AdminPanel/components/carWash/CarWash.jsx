import React, { useState } from "react";
import CarWashForm from "./CarWashForm";
import CarWashList from "./CarWashList";
import PostFilter from "../Filter";
import MyModal from "../../../../components/MyModal/MyModal";
import { usePosts } from "../../../../hooks/useClient";
import CarWashEdit from "./CarWashEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getCarWashes, remove } from "../../../../http/carWashAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";



const CarWash = observer(() => {
  const [carWahes, setCarWahes] = useState([]);
  const [carWash, setCarWash] = useState({});
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });


  const createCarWash = async (newPost) => {
    await create(newPost.name, newPost.number, newPost.address);
    await getCarWashList();
    setModal(false);
  }

  const sortedAndSearchPost = usePosts(carWahes, filter.sort, filter.query);

  const removePost = async (post) => {
    remove(post.id);
  }

  const getCarWashList = async () => {
    const data = await getCarWashes(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setCarWahes(data.rows)
  }

  const view = (state, post) => {
    setModalEdit(state)
    setCarWash(post)
  }

  const editCarWash = (editPost) => {
    edit(editPost.id, editPost.name, editPost.number, editPost.address)
    setModalEdit(false)
    setCarWash({ title: "", body: "" })
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
          <CarWashForm create={createCarWash} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <CarWashEdit getClientList={getCarWashList} edit={editCarWash} post={carWash} />
        </MyModal>
        <PostFilter
          filter={filter}
          setFilter={setFilter}
        />
        <CarWashList remove={removePost} view={view} posts={sortedAndSearchPost} title="Автомойки" listNameKeys={[]} />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getCarWashList}
        />
      </Container>
    </div>
  );
})

export default CarWash;
