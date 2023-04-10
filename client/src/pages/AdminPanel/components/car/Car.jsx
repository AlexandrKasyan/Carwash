import React, { useState } from "react";
import CarForm from "./CarForm";
import CarList from "./CarList";
import PostFilter from "../Filter";
import MyModal from "../../../../components/MyModal/MyModal";
import { usePosts } from "../../../../hooks/useCar";
import CarEdit from "./CarEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getCars, remove } from "../../../../http/carAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";



const Car = observer(() => {
  const [carWahes, setCars] = useState([]);
  const [carWash, setCar] = useState({});
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });

  
  const createCar = async (newPost) => {
    await create(newPost.number, newPost.yearRelease, newPost.bodyId, newPost.carBrandId);
    await getCarList();
    setModal(false);
  }

  const sortedAndSearchPost = usePosts(carWahes, filter.sort, filter.query);
  
  const removePost = async (post) => {
    remove(post.id);
    await getCarList();
  }

  const getCarList = async () => {
    const data = await getCars(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setCars(data.rows)
  }

  const view = (state, post) =>{
    setModalEdit(state)
    setCar(post) 
  }

  const editCar = async  (editPost) => {
    edit(editPost.id, editPost.number, editPost.yearRelease, editPost.bodyId, editPost.carBrandId)
    setModalEdit(false)
    await getCarList();
  }

  const changePage = (p) => {
    setQueryParams({ ...queryParams, page: p })
  }

  return (
    <div className="admin-panel">
      <NavAdmin/>
    <Container className="admin-content">
      <Button onClick={() => setModal(true)}>Создать запись</Button>

      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <CarForm create={createCar} />
      </MyModal>
      
      <MyModal
        visible={modalEdit}
        setVisible={setModalEdit}
      >
       <CarEdit getClientList={getCarList} edit={editCar} post={carWash}/>
      </MyModal>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <CarList remove={removePost} view={view} posts={sortedAndSearchPost} title="Автомобили" listNameKeys = {[]} />
      <Pages
        postTotalPages={totalPages} page = {queryParams.page} changePage = {changePage} getList = {getCarList}
      />
    </Container>
    </div>
  );
})

export default Car;
