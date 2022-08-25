import { useState, useEffect, Fragment } from 'react'
import AVDataTable from '../../tables/data-tables/av_table'
import AddCompany from './addCategory'
import { useSelector, useDispatch } from 'react-redux'
import { softRequest } from '../../../@core/auth/request'
import { DELET_COMPANY, GET_ALL_COMPANIES } from '../../../@core/auth/req.config'
import { errorToast, successToast } from '../../../@core/components/toastify'
import { getColumns } from "./schema";
import { DATA_PER_PAGE } from '../../../configs/constants'
import { PopUpAvtModal } from '../../components/modal/modal.controller'
import AddCategory from './addCategory'

const data = [
  {
    categoryName:'food',
    createdAt:'09/23/2016',
    image:'',
  },
  {
    categoryName:'fashion',
    createdAt:'09/23/2016',
    image:'',
  },
  {
    categoryName:'tech',
    createdAt:'09/23/2016',
    image:'',
  },
  {
    categoryName:'clothes',
    createdAt:'09/23/2016',
    image:'',
  },
]

const CategoryDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setCategories(data)
    // getAllCategories()
  }, [data])

  const getAllCategories = async (page = 1) => {
    try {
      const url = `${GET_ALL_COMPANIES}?page=${page}`;
      const response = await softRequest(url, 'GET', false, true);
      const { result, ok } = response;
      if (!ok) return;
      setCategories(result.categories);
      const total = Math.ceil(result.total / DATA_PER_PAGE);
      setTotalCategories(total);
    } catch (error) {
      errorToast('Error', 'Network Error')
    }
  }

  const onNewCategoryAdd = (data) => {
    let catogoriesBackup = [...categories];
    catogoriesBackup.unshift(data);
    setCompanies(catogoriesBackup);
  }

  const onEditHandler = (e, row, index) => {
    e.preventDefault();
    setSelectedCategory(row);
    PopUpAvtModal(true);
  };

  const onDeleteHandler = async (e, row, index) => {
    try {
      e.preventDefault();
      const url = `${DELET_COMPANY}/${row._id}`
      const response = await softRequest(url, 'DELETE', true, true);
      if (!response.ok) return;
      const newCategoriesList = [...categories];
      newCategoriesList.splice(index, 1);
      setCategories(newCategoriesList);
      successToast('Success', 'Deleted Successfully');
    } catch (error) {
      errorToast('Error', 'Something Went Wrong!')
    }
  };

  const actionCallBacks = {
    onEdit: onEditHandler,
    onDelete: onDeleteHandler,
  }

  const addModalPayload = {
    ContextBody: AddCategory,
    ContextTitle: selectedCategory ? 'Edit Category' : 'Add Category',
    contextCallback: onNewCategoryAdd,
    selectedCategory: selectedCategory,
  }

  return (
    <Fragment>
      <AVDataTable cardTitle="Category List" addModal={addModalPayload} data={categories} columns={getColumns} getPaginateData={getAllCategories}
        totalDataCounts={totalCategories} actionCallBacks={actionCallBacks} />
    </Fragment>
  )
}

export default CategoryDashboard
