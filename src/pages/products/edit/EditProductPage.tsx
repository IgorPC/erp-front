import { useParams } from "react-router-dom";
import Request from "../../../requests/Request"
import React, {useState, useEffect, Fragment} from 'react';
import PageLoadingSpinner from "../../../components/pageLoading/PageLoading";
import PageLayout from "../../../components/pageLayout/PageLayout";
import { useNavigate } from 'react-router-dom';
import CookieManager from "../../../cookieManager/CookieManager";
import DefaultAlert from "../../../components/alert/DefaultAlert";
import Grid from '@mui/material/Grid';
import DefaultBox from "../../../components/box/DefaultBox";
import DefaultDivider from '../../../components/divider/DefaultDivider';
import TextInput from '../../../components/inputs/textInput/TextInput';
import SelectInput from "../../../components/inputs/select/SelectInput";
import Button from '@mui/material/Button';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  interface ProductStatusInterface {
    field: string,
    value: string,
  }

  interface ProductStatusResponse {
    id: string,
    description: string,
  }

  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [status, setStatus] = useState({
    field: "",
    value: ""
  })
  const [statusList, setStatusList] = useState<ProductStatusInterface[]>([])

  const [nameError, setNameError] = useState("")
  const [codeError, setCodeError] = useState("")
  const [priceError, setPriceError] = useState("")
  const [quantityError, setQuantityError] = useState("")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  useEffect(() => {
    getProduct(id)
  }, [])

  const getProduct = async (productId: any) => {
    try {
      setIsLoading(true)

      const response = await Request.get(`/product/${productId}`, true)
      await setProduct(response.data.name, response.data.price, response.data.quantity, response.data.code, response.data.product_status.id, response.data.product_status.description)
      
      const statusResponse = await Request.get(`/product-status`, true)
      await fillStatusList(statusResponse.data)

      setIsLoading(false)
    } catch (error) {
      console.log(`error`)
      setIsLoading(false)
    }
  }

  const fillStatusList = async (listOfStatus: Array<ProductStatusResponse>) => {

    const list: ProductStatusInterface[] = []

    listOfStatus.forEach(status => {
      const objectFound  = list.find(function(object) {
        return object.value === status.id;
      });

      if (objectFound === undefined) {
        list.push({
          field: status.id,
          value: status.description
        })
      }
    })
    setStatusList(list)
  }

  const setProduct = async (name: string, price: string, quantity: string, code: string, statusId: string, statusDescription: string) => {
    setName(name)
    setCode(code)
    setPrice(price)
    setQuantity(quantity)
    if (statusId && statusDescription) {
      setStatus({
        field: statusId,
        value: statusDescription
      })
    }
  }

  const handleName = (value: string) => {
    setNameError("")
    setName(value)
  }

  const handleCode = (value: string) => {
    setCodeError("")
    setCode(value)
  }

  const handlePrice = (value: string) => {
    setPriceError("")
    setPrice(value)
  }

  const handleQuantity = (value: string) => {
    setQuantityError("")
    setQuantity(value)
  }

  const handleStatus = (status: any) => {
    if (status.field !== undefined && status.value !== undefined) {
      setStatus(status)
    }
  }

  const validateProductData = async () => {
    let error = false

    if (! name.length) {
      setNameError("Product Name can not be empty")
      error = true
    }

    if (! code.length) {
      setCodeError("Product Code can not be empty")
      error = true
    }

    if (! price) {
      setPriceError("Product Price can not be empty")
      error = true
    }

    if (! quantity) {
      setQuantityError("Product Quantity can not be empty")
      error = true
    }

    return error
  }

  const saveProduct = async () => {
    const hasError = await validateProductData()

    if (hasError) {
      return false;
    }

    setIsLoading(true)

    const body = {
      code: code,
      name: name,
      price: price,
      quantity: quantity,
      status_id: status.field
    }

    const response = await Request.put(`/product/${id}`, body, true);

    if (! response) {
      setError("Internal Server Error")
      setIsLoading(false)
      return false
    }

    if (! response.data.success) {
        setError(response.data.data)
        setIsLoading(false)
        return false
    }

    setSuccess("Product sucessfully updated")
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <PageLoadingSpinner
        title="Edit Product"
      />
    )
  }

  let alert = (<Fragment></Fragment>)

  if (error) {
      alert = (
          <Fragment>
              <br />
                  <DefaultAlert
                      type="error"
                      message={error}
                  />
              <br />
          </Fragment>
      )
  }

  if (success) {
    alert = (
      <Fragment>
          <br />
              <DefaultAlert
                  type="success"
                  message={success}
              />
          <br />
      </Fragment>
  )
  }

  return (
    <PageLayout title='Edit Product'>
      <div>
        { alert }
        <Grid container spacing={2}>
          <Grid item md={7} sm={12} xs={12}>
            <DefaultBox>
              <DefaultDivider
                title={name}
              />
              <br />
              <TextInput
                name="Product Name"
                type="text"
                callback={handleName}
                error={nameError}
                value={name}
              />
              <br />
              <br />
              <TextInput
                name="Product code"
                type="text"
                callback={handleCode}
                error={codeError}
                value={code}
              />
              <br />
              <br />
              <Grid container spacing={2}>
                <Grid item md={6} sm={6} xs={12}>
                  <TextInput
                    name="Product Price"
                    type="text"
                    callback={handlePrice}
                    error={priceError}
                    value={price}
                  />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                  <TextInput
                    name="Product Quantity"
                    type="number"
                    callback={handleQuantity}
                    error={quantityError}
                    value={quantity}
                  />
                </Grid>
              </Grid>
              <br />
              <SelectInput
                name="Product Status"
                options={statusList}
                callback={handleStatus}
                value={{
                  field: status.field,
                  value: status.value
                }}
              />
              <br />
              <br />
              <Button
                onClick={saveProduct}
                style={{ width: '100%' }}
                variant="contained">
                  Save
              </Button>
            </DefaultBox>
          </Grid>
          <Grid item md={5} sm={12} xs={12}>
            <DefaultBox>
              <h1>Product Images section</h1>
            </DefaultBox>
          </Grid>
        </Grid>
      </div>
    </PageLayout>
  );
};

export default EditProductPage;