import React, { useState } from "react";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";
import MyModal from "../../../../components/MyModal/MyModal";
import OrderEdit from "./OrderEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getOrders, remove } from "../../../../http/orderAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";
import { usePosts } from "../../../../hooks/useClient";
import { getClients } from "../../../../http/clientAPI";
import { getStatuses } from "../../../../http/statusAPI";
import PostFilter from "../Filter";
import { createReport, downloadReport } from "../../../../http/reportAPI";
import { MdCreate } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";


const Order = observer(() => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 100, page: 1 });
  const [filter, setFilter] = useState({ sort: '', query: '', search: 'id', date1: '', date2: '' });

  const sortedAndSearchPost = usePosts(orders, filter.sort, filter.query, filter.search, filter.date1, filter.date2);

  const createPost = async (newPost) => {
    await create(newPost.dateTime, newPost.generalPrice, newPost.statusId, newPost.clientId);
    await getList();
    setModal(false);
  }

  const removePost = async (post) => {
    await remove(post.id);
    await getList();
  }

  const getList = async () => {
    const clientData = await getClients(queryParams.limit, queryParams.page)
    const orderData = await getOrders(queryParams.limit, queryParams.page)
    const statuses = await getStatuses(queryParams.limit, queryParams.page)
    const orderArray = orderData.rows.map((element) => {
      clientData.forEach((client) => {
        if (element.clientId === client.id) {
          element = {
            ...element,
            name: client.name,
            phoneNumber: client.phoneNumber,
            userId: client.userId,
            createdAt: element.createdAt.slice(0, 10)
          }
        }
      })
      return element
    })
    const orderArrayWithStatuses = orderArray.map((orderElement) => {
      statuses.rows.forEach((status) => {
        if (orderElement.statusId === status.id)
          orderElement = {
            ...orderElement,
            status: status.name
          }
      })
      return orderElement
    })
    console.log(orderArrayWithStatuses)
    setTotalPages(getPagesCount(orderData.count, queryParams.limit))
    setOrders(orderArrayWithStatuses)
  }

  const view = (state, post) => {
    setModalEdit(state)
    setOrder(post)
  }

  const editPost = async (editPost) => {
    console.log(editPost)
    setModalEdit(false)
    await edit(editPost.id, editPost.dateTime, editPost.generalPrice, editPost.statusId, editPost.clientId)
    await getList();
  }

  const changePage = (p) => {
    setQueryParams({ ...queryParams, page: p })
  }

  const report = async () => {
    const columns = [
      { header: 'id', key: 'id', width: 5 },
      { header: 'Дата создания заказа', key: 'createdAt', width: 23, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'Дата выполнения заказа', key: 'dateTime', width: 24, style: { numFmt: 'dd/mm/yyyy' } },
      { header: 'ФИО', key: 'name', width: 30 },
      { header: 'Сумма', key: 'generalPrice', width: 8 },
      { header: 'Статус', key: 'status', width: 6 }
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
          <OrderForm create={createPost} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <OrderEdit getClientList={getList} edit={editPost} post={order} />
        </MyModal>
        <PostFilter
          filter={filter}
          setFilter={setFilter}
          optionsSort={[
            { value: 'name', name: 'Имени' },
            { value: 'status', name: 'Статусу' },
            { value: 'createdAt', name: 'Дате создания' },
            { value: 'dateTime', name: 'Дате выполнения' },
            { value: 'generalPrice', name: 'Цене' },
          ]}
          optionsSearh={[
            { value: 'id', name: 'ID' },
            { value: 'name', name: 'Имени' },
            { value: 'createdAt', name: 'Дате создания' },
            { value: 'dateTime', name: 'Дате выполнения' },
            { value: 'generalPrice', name: 'Цене' },
          ]}
        />
        <OrderList remove={removePost} view={view} posts={sortedAndSearchPost} title="Заказы" listNameKeys={[]} />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getList}
        />
      </Container>
    </div>
  );
})

export default Order;
