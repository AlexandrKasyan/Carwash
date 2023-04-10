import React, { useState } from "react";
import ClientForm from "./ClientForm";
import ClientList from "./ClientList";
import PostFilter from "../Filter";
import MyModal from "../../../../components/MyModal/MyModal";
import { usePosts } from "../../../../hooks/useClient";
import ClientEdit from "./ClientEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getClients, remove } from "../../../../http/clientAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../../components/NavAdmin";



const Clients = observer(() => {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({});
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });


  const createClient = async (newPost) => {
    await create(newPost.name, newPost.phoneNumber, newPost.userId, newPost.discountId);
    await getClientList();
    setModal(false);
  }

  const sortedAndSearchPost = usePosts(clients, filter.sort, filter.query);

  const removePost = async (post) => {
    remove(post.id);
  }

  const getClientList = async () => {
    const data = await getClients(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setClients(data.rows)
  }

  const view = (state, post) => {
    setModalEdit(state)
    setClient(post)
  }

  const editUser = (editPost) => {
    edit(editPost.id, editPost.name, editPost.phoneNumber, editPost.userId, editPost.discountId)
    setModalEdit(false)
    setClient({ title: "", body: "" })
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
          <ClientForm create={createClient} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <ClientEdit getClientList={getClientList} edit={editUser} post={client} />
        </MyModal>
        <PostFilter
          filter={filter}
          setFilter={setFilter}
        />
        <ClientList remove={removePost} view={view} posts={sortedAndSearchPost} title="Клиенты" listNameKeys={[]} />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getClientList}
        />
      </Container>
    </div>
  );
})

export default Clients;
