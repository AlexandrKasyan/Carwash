import React, { useState } from "react";
import BrandForm from "./BrandForm";
import BrandList from "./BrandList";
import PostFilter from "../Filter";
import MyModal from "../../../../components/MyModal/MyModal";
import { usePosts } from "../../../../hooks/useClient";
import BrandEdit from "./BrandEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getBrands, remove } from "../../../../http/brandAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";



const Brand = observer(() => {
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState({});
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });

  
  const createBrand = async (newPost) => {
    await create(newPost.name);
    await getBrandList();
    setModal(false);
  }

  const sortedAndSearchPost = usePosts(brands, filter.sort, filter.query);
  
  const removePost = async (post) => {
    remove(post.id);
  }

  const getBrandList = async () => {
    const data = await getBrands(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setBrands(data.rows)
  }

  const view = (state, post) =>{
    setModalEdit(state)
    setBrand(post) 
  }

  const editBrand = (editPost) => {
    edit(editPost.id, editPost.name, editPost.number, editPost.address)
    setModalEdit(false)
    setBrand({title: "", body: ""})
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
        <BrandForm create={createBrand} />
      </MyModal>
      
      <MyModal
        visible={modalEdit}
        setVisible={setModalEdit}
      >
       <BrandEdit getClientList={getBrandList} edit={editBrand} post={brand}/>
      </MyModal>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <BrandList remove={removePost} view={view} posts={sortedAndSearchPost} title="Бренды" listNameKeys = {[]} />
      <Pages
        postTotalPages={totalPages} page = {queryParams.page} changePage = {changePage} getList = {getBrandList}
      />
    </Container>
    </div>
  );
})

export default Brand;
