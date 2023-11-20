import React, {useState, Fragment} from "react"
import PageLayout from '../../../components/pageLayout/PageLayout';
import Grid from '@mui/material/Grid';
import DefaultBox from "../../../components/box/DefaultBox";
import DefaultDivider from '../../../components/divider/DefaultDivider';
import TextInput from '../../../components/inputs/textInput/TextInput';
import PageLoadingSpinner from "../../../components/pageLoading/PageLoading";
import DefaultAlert from "../../../components/alert/DefaultAlert";
import CookieManager from "../../../cookieManager/CookieManager";
import Request from "../../../requests/Request";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const CreatePage = (props: any) => {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")

  const [nameError, setNameError] = useState("")
  const [codeError, setCodeError] = useState("")
  const [priceError, setPriceError] = useState("")
  const [quantityError, setQuantityError] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate();

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

    if (! price.length) {
      setPriceError("Product Price can not be empty")
      error = true
    }

    if (! quantity.length) {
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

    const userData = await CookieManager.getUserData()
    const body = {
      code: code,
      name: name,
      price: price,
      quantity: quantity,
      user_id: userData.id
    }

    const response = await Request.post(`/product`, body, true);

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

    navigate(`/product/${response.data.product_id}`)
  }
  
  if (isLoading) {
    return (
        <PageLoadingSpinner
            title="Create Product"
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

  return (
    <PageLayout title='Create Product'>
      <div>
        { alert }
        <Grid container spacing={2}>
          <Grid item md={7} sm={12} xs={12}>
            <DefaultBox>
              <DefaultDivider
                title="New Product"
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
}

export default CreatePage