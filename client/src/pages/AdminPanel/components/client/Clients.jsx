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
import { getAllUsers } from "../../../../http/userAPI";
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { MdCreate } from "react-icons/md";
import { createReport, downloadReport } from "../../../../http/reportAPI";




const Clients = observer(() => {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({});
  const [filter, setFilter] = useState({ sort: '', query: '', search: 'id', date1: '', date2: '' });
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });


  const createClient = async (newPost) => {
    await create(newPost.name, newPost.phoneNumber, newPost.userId, newPost.discountId);
    await getClientList();
    setModal(false);
  }

  const sortedAndSearchPost = usePosts(clients, filter.sort, filter.query, filter.search, filter.date1, filter.date2);

  const removePost = async (post) => {
    await remove(post.id);
    await getClientList();
  }

  const getClientList = async () => {
    const users = await getUsers()
    const data = await getClients(queryParams.limit, queryParams.page)
    // eslint-disable-next-line 
    const clientsArr = data.map((clientData) => {
      let newUser
      users.forEach((user) => {
        if (clientData.userId === user.id) {
          newUser = {
            ...clientData,
            email: user.email,
            createdAt: user.createdAt.slice(0, 10)
          }
          return newUser
        }

      })
      if (newUser)
        return newUser
    })

    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setClients(clientsArr)
  }

  const getUsers = async () => {
    const data = await getAllUsers()
    return data
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

  const report = async () => {
    const columns = [
      { header: 'id', key: 'id', width: 5 },
      { header: 'Дата регистрации', key: 'createdAt', width: 17, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'ФИО', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 32 },
      { header: 'Телефон', key: 'phoneNumber', width: 17 },
      { header: 'Скидка', key: 'discount', width: 32 },
  ]
  const fileName = await createReport(sortedAndSearchPost, columns)
  await downloadReport(fileName)
}


  return (
    <div className="admin-panel">
      <NavAdmin />
      <Container className="admin-content">
        <div className="control-buttons">
          <Button className="" onClick={() => setModal(true)}> <MdCreate /> Создать запись</Button>
          <Button className="ms-3" variant="success" onClick={() => report()}> <HiOutlineDocumentReport /> Скачать отчёт</Button>
        </div>

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
          optionsSort={[
            { value: 'name', name: 'Имени' },
            { value: 'email', name: 'Email' },
            { value: 'createdAt', name: 'Дате регистрации' },
            { value: 'phoneNumber', name: 'Номеру телефона' }
          ]}
          optionsSearh={[
            { value: 'id', name: 'ID' },
            { value: 'name', name: 'Имени' },
            { value: 'email', name: 'Email' },
            { value: 'createdAt', name: 'Дате создания' },
            { value: 'phoneNumber', name: 'Номеру телефона' }
          ]}
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
