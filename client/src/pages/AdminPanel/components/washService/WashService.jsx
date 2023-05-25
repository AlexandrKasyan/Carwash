import React, { useContext, useState } from "react";
import WashServiceForm from "./WashServiceForm";
import WashServiceList from "./WashServiceList";
import MyModal from "../../../../components/MyModal/MyModal";
import WashServiceEdit from "./WashServiceEdit";
import { Button, Container } from "react-bootstrap";
import { create, edit, getWashServices, remove } from "../../../../http/washServiceAPI";
import { getPagesCount } from "../../../../utils/pages";
import Pages from "../../../../components/UI/buttons/pagination/Pages";
import { observer } from "mobx-react-lite";
import { NavAdmin } from "../NavAdmin";
import { getEmployee } from "../../../../http/staffAPI";
import { createReport, downloadReport } from "../../../../http/reportAPI";
import { getOrderServiceRelations } from "../../../../http/orderServiceRelationAPI";
import { Context } from "../../../..";



const WashService = observer(() => {
  const [washServices, setWashServices] = useState([]);
  const [washService, setWashService] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ limit: 9, page: 1 });
  const { user } = useContext(Context)


  const createPost = async (newPost) => {
    await create(newPost);
    await getList();
    setModal(false);
  }

  const removePost = async (post) => {
    await remove(post.id);
    await getList();
  }

  const getList = async () => {
    const data = await getWashServices(queryParams.limit, queryParams.page)
    setTotalPages(getPagesCount(data.count, queryParams.limit))
    setWashServices(data.rows)
  }

  const view = (state, post) => {
    setModalEdit(state)
    setWashService(post)
  }

  const editPost = async (editPost) => {
    setModalEdit(false)
    await edit(editPost)
    await getList();
  }

  const changePage = (p) => {
    setQueryParams({ ...queryParams, page: p })
  }


  const getAllServicesNameAndCount = async () => {
    const services = await getWashServices(100, 1)
    const ordersRelations = await getOrderServiceRelations(1000, 1)
    const dateNow = new Date();
    const year = new Date(new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000);
    const month = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
    const day = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)

    const arrayServicesNameCostCount = services.rows.map(service => {
      let countAll = 0
      let countYear = 0
      let countMonth = 0
      let countDay = 0
      ordersRelations.rows.forEach((order) => {
        if (service.id === order.washServiceId) {
          const orderDate = order.createdAt
          countAll = countAll + 1
          if (new Date(orderDate) >= year && new Date(orderDate) <= dateNow)
            countYear = countYear + 1
          if (new Date(orderDate) >= month && new Date(orderDate) <= dateNow)
            countMonth = countMonth + 1
          if (new Date(orderDate) >= day && new Date(orderDate) <= dateNow)
            countDay = countDay + 1
        }

      })

      return {
        serviceName: service.name,
        serviceCost: service.cost,
        countAll: countAll,
        countYear: countYear,
        countMonth: countMonth,
        countDay: countDay
      }
    })

    return arrayServicesNameCostCount
  }



  const report = async (dateStart, dateEnd) => {
    const employee = await getEmployee(user.user.id)
    const nameReport = 'Статистика услуг'
    const columns = [
      { header: 'Название услуги', key: 'serviceName', width: 25 },
      { header: 'Цена', key: 'serviceCost', width: 10 },
      { header: 'Заказов за все время', key: 'countAll', width: 25 },
      { header: 'Заказов за год', key: 'countYear', width: 25 },
      { header: 'Заказов за месяц', key: 'countMonth', width: 25 },
      { header: 'Заказов за день', key: 'countDay', width: 25 },
    ]
    if (employee.name) {
      const arrayServices = await getAllServicesNameAndCount(dateStart, dateEnd)
      const fileName = await createReport(arrayServices, columns, nameReport, employee)
      await downloadReport(fileName)
    }
  }

  return (
    <div className="admin-panel">
      <NavAdmin />
      <Container className="admin-content">
        <Button onClick={() => setModal(true)}>Создать запись</Button>
        <Button onClick={() => report()}>Отчёт</Button>

        <MyModal
          visible={modal}
          setVisible={setModal}
        >
          <WashServiceForm create={createPost} />
        </MyModal>

        <MyModal
          visible={modalEdit}
          setVisible={setModalEdit}
        >
          <WashServiceEdit getClientList={getList} edit={editPost} post={washService} />
        </MyModal>

        <WashServiceList remove={removePost} view={view} posts={washServices} title="Услуги" listNameKeys={[]} />
        <Pages
          postTotalPages={totalPages} page={queryParams.page} changePage={changePage} getList={getList}
        />
      </Container>
    </div>
  );
})

export default WashService;
