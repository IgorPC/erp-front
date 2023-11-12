import React, { useState, useEffect } from "react"
import PageLayout from '../../../components/pageLayout/PageLayout';
import DefaultPagination from "../../../components/pagination/DefaultPagination"
import Request from "../../../requests/Request"
import ProductAccordion from "../../../components/accordion/ProductAccordion/ProductAccordion";
import PageLoadingSpinner from "../../../components/pageLoading/PageLoading";
import HelperFunctions from "../../../utilities/HelperFunctions";
import TextInput from "../../../components/inputs/textInput/TextInput";
import Grid from '@mui/material/Grid';
import SelectInput from "../../../components/inputs/select/SelectInput";
import Button from '@mui/material/Button';

import "./ListPage.css"

const ListPage = () => {
  interface ProductObject {
    id: number,
    code: string,
    name: string,
    price: number,
    createdBy: string,
    quantity: number,
    status: string,
    createdAt: string,
    updatedAt: string
  }

  const [page, setPage] = useState(1)
  const [totalOfPages, setTotalOfPages] = useState(1)
  const [filterBy, setFilterBy] = useState("")
  const [filterText, setFilterText] = useState("")
  const [products, setProducts] = useState<ProductObject[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getProductList(page)
  }, [])

  const filterOptions = [
    {
      field: 'name',
      value: 'Name'
    },
    {
      field: 'price',
      value: 'Price'
    },
    {
      field: 'code',
      value: 'Code'
    },
    {
      field: 'createdBy',
      value: 'Created By'
    },
  ]

  const getProductList = async (page: number) => {
    try {
      setIsLoading(true)
      
      let url = `/product?page=${page}&rows=10`

      if (filterBy && filterText) {
        url += `&filterBy=${filterBy}&search=${filterText}`
      }

      const response = await Request.get(url, true)
      setTotalOfPages(response.data.last_page)

      const list: ProductObject[] =[]

      await response.data.data.map((product: any) => {
        if (! products.some((productList: any) => productList.id === product.id)) {

          const newProduct: ProductObject = {
            id: product.id,
            code: product.code,
            name: product.name,
            price: product.price,
            createdBy: `${product.created_by.first_name} ${product.created_by.last_name}`,
            quantity: product.quantity,
            status: product.product_status.description,
            createdAt: HelperFunctions.timeFormater(product.created_at),
            updatedAt: HelperFunctions.timeFormater(product.updated_at)
          }

          list.push(newProduct)
        }
      });

      if (list.length) {
        setProducts(list)
      }
      
      setIsLoading(false)
    } catch (error) {
      console.log(`error`)
      setIsLoading(false)
    }
  }

  const handlePageChange = async (value: number) => {
    setPage(value)
    await getProductList(value)
  }

  const handleFilterChange = async (value: any) => {
    setFilterBy(value.field)
  }

  const handleFilterTextChange = async (value: string) => {
    setFilterText(value)
  }

  const applyFilters = async () => {
    await getProductList(page)
  }

  if (isLoading) {
    return (
      <PageLoadingSpinner
        title="Product List"
      />
    )
  }

  return (
    <PageLayout title='Product List'>
      <div>
        <br />
        <div>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12} md={2} lg={2}>
              <SelectInput
                name="Filter by:"
                callback={handleFilterChange}
                options={filterOptions}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={8} lg={8}>
              <TextInput
                name="Type the filter here"
                callback={handleFilterTextChange}
                error=""
                type="text"
                value={filterText}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={2} lg={2}>
              <Button onClick={applyFilters} style={{width: '100%', height: '100%'}} variant="contained">Search</Button>
            </Grid>
          </Grid>
        </div>
        <br />
        {
          products.map((product: any) => {
            if (product.id !== undefined) {
              return (
                <div key={`product-accordion-${product.id}`} className="product-list-accordion">
                  <ProductAccordion
                    name={product.name}
                    price={product.price}
                    quantity={product.quantity}
                    status={product.status}
                    createdAt={product.createdAt}
                    updatedAt={product.updatedAt}
                    createdBy={product.createdBy}
                    id={product.id}
                    code={product.code}
                  />
                </div>
              )
            }
          })
        }
        <br />
        <DefaultPagination
          currentPage={page}
          totalOfPages={totalOfPages}
          callback={handlePageChange}
        />
      </div>
    </PageLayout>
  );
}

export default ListPage