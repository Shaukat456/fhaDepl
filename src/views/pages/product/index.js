import { useState, useEffect, Fragment } from 'react'
import AVDataTable from '../../tables/data-tables/av_table'
import AddProduct from './addCompany'
import { useSelector, useDispatch } from 'react-redux'
import { softRequest } from '../../../@core/auth/request'
import { DELET_PRODUCTS, GET_ALL_PRODUCTS } from '../../../@core/auth/req.config'
import { errorToast, successToast } from '../../../@core/components/toastify'
import { getColumns } from "./schema";
import { DATA_PER_PAGE } from '../../../configs/constants'
import { PopUpAvtModal } from '../../components/modal/modal.controller'



const ProductDashboard = () => {

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);


  useEffect(() => {
    getAllProduct()
  }, [])

  const getAllProduct = async (page = 1) => {
    try {
      const url = `${GET_ALL_PRODUCTS}?page=${page}`;
      const response = await softRequest(url, 'GET', false, true);
      const { result, ok } = response;
      if (!ok) return;
      setProducts(result.products);
      const total = Math.ceil(result.total / DATA_PER_PAGE);
      setTotalProducts(total);
    } catch (error) {
      errorToast('Error', 'Network Error')
    }
  }

  const onNewProductAdd = (data) => {
    let ProductBackup = [...products];
    ProductBackup.unshift(data);
    setProducts(ProductBackup);
  }

  const onEditHandler = (e, row, index) => {
    e.preventDefault();
    setSelectedProduct(row);
    PopUpAvtModal(true);
  };

  const onDeleteHandler = async (e, row, index) => {
    try {
      e.preventDefault();
      const url = `${DELET_PRODUCTS}/${row._id}`
      const response = await softRequest(url, 'DELETE', true, true);
      if (!response.ok) return;
      const newProductList = [...products];
      newProductList.splice(index, 1);
      setProducts(newProductList);
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
    ContextBody: AddProduct,
    ContextTitle: selectedProduct ? 'Edit Product' : 'Add Product',
    contextCallback: onNewProductAdd,
    selectedProduct: selectedProduct,
  }

  return (
    <Fragment>
      <AVDataTable cardTitle="Product List" addModal={addModalPayload} data={products} columns={getColumns} getPaginateData={getAllProduct}
        totalDataCounts={totalProducts} actionCallBacks={actionCallBacks} />
    </Fragment>
  )
}

export default ProductDashboard
