import React, { useState } from "react";
import DiscountForm from "./DiscountForm";
import DiscountList from "./DiscountList";
import PostFilter from "../Filter";
import MyModal from "../../../../components/MyModal/MyModal";
import { usePosts } from "../../../../hooks/useClient";
import DiscountEdit from "./DiscountEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getDiscounts, remove } from "../../../../http/discountAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";



const Discount = observer(() => {
  const [discounts, setDiscounts] = useState([]);
  const [discount, setDiscount] = useState({});
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });


  const createDiscount = async (newPost) => {
    await create(newPost.name, newPost.discountPercentage, newPost.numberVisits);
    await getDiscountList();
    setModal(false);
  }

  const sortedAndSearchPost = usePosts(discounts, filter.sort, filter.query);

  const removePost = async (post) => {
    remove(post.id);
  }

  const getDiscountList = async () => {
    const data = await getDiscounts(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setDiscounts(data.rows)
  }

  const view = (state, post) => {
    setModalEdit(state)
    setDiscount(post)
  }

  const editDiscount = (editPost) => {
    edit(editPost.id, editPost.name, editPost.discountPercentage, editPost.numberVisits)
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
          <DiscountForm create={createDiscount} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <DiscountEdit getClientList={getDiscountList} edit={editDiscount} post={discount} />
        </MyModal>
        <PostFilter
          filter={filter}
          setFilter={setFilter}
        />
        <DiscountList remove={removePost} view={view} posts={sortedAndSearchPost} title="Скидки" listNameKeys={[]} />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getDiscountList}
        />
      </Container>
    </div>
  );
})

export default Discount;
