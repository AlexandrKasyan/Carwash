import React, { useState } from "react";
import StaffForm from "./StaffForm";
import StaffList from "./StaffList";
import PostFilter from "../Filter";
import MyModal from "../../../../components/MyModal/MyModal";
import { usePosts } from "../../../../hooks/useClient";
import StaffEdit from "./StaffEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getStaff, remove } from "../../../../http/staffAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";



const Staff = observer(() => {
  const [staffs, setStaffs] = useState([]);
  const [staff, setStaff] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });
  const [filter, setFilter] = useState({ sort: '', query: '', search: 'id', date1: '', date2: '' });

  const sortedAndSearchPost = usePosts(staffs, filter.sort, filter.query, filter.search, filter.date1, filter.date2);


  const createStaff = async (newPost) => {
    await create(newPost.name, newPost.phoneNumber, newPost.position, newPost.userId, newPost.postId);
    await getStaff();
    setModal(false);
  }


  const removePost = async (post) => {
    remove(post.id);
  }

  const getStaffList = async () => {
    const data = await getStaff(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setStaffs(data.rows)
  }

  const view = (state, post) => {
    setModalEdit(state)
    setStaff(post)
  }

  const editStaff = (editPost) => {
    edit(editPost.id, editPost.name, editPost.position, editPost.phoneNumber, editPost.userId, editPost.postId)
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
          <StaffForm create={createStaff} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <StaffEdit getClientList={getStaffList} edit={editStaff} post={staff} />
        </MyModal>
        <PostFilter
          filter={filter}
          setFilter={setFilter}
          optionsSort={[
            { value: 'name', name: 'Имя' },
            { value: 'position', name: 'Должность' },
            { value: 'phoneNumber', name: 'Дата создания' },

          ]}
          optionsSearh={[
            { value: 'id', name: 'Id' },
            { value: 'name', name: 'Имя' },
            { value: 'position', name: 'Должность' },
            { value: 'phoneNumber', name: 'Дата создания' },
          ]}
        />
        <StaffList remove={removePost} view={view} posts={sortedAndSearchPost} title="Сотрудники" listNameKeys={[]} />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getStaffList}
        />
      </Container>
    </div>
  );
})

export default Staff;
