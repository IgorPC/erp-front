import React, { useState, useEffect } from "react"
import PageLayout from '../../../components/pageLayout/PageLayout';
import DefaultPagination from "../../../components/pagination/DefaultPagination"
import Request from "../../../requests/Request"
import PageLoadingSpinner from "../../../components/pageLoading/PageLoading";
import HelperFunctions from "../../../utilities/HelperFunctions";
import TextInput from "../../../components/inputs/textInput/TextInput";
import Grid from '@mui/material/Grid';
import SelectInput from "../../../components/inputs/select/SelectInput";
import Button from '@mui/material/Button';
import ClientAccordion from "../../../components/accordion/ClientAccordion/ClientAccordion";

import "./ListPage.css"

const ListPage = () => {
  interface ClientObject {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    status: string,
    createdBy: string,
    createdAt: string,
  }

  const [page, setPage] = useState(1)
  const [totalOfPages, setTotalOfPages] = useState(1)
  const [filterBy, setFilterBy] = useState("first_name")
  const [filterText, setFilterText] = useState("")
  const [clients, setClients] = useState<ClientObject[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getClientList(page)
  }, [])

  const filterOptions = [
    {
      field: 'first_name',
      value: 'First Name'
    },
    {
      field: 'last_name',
      value: 'Last Name'
    },
    {
      field: 'email',
      value: 'Email'
    },
    {
      field: 'phone_number',
      value: 'Phone Number'
    },
  ]

  const getClientList =  async (page: number) => {
    try {
        setIsLoading(true)
        
        let url = `/client?page=${page}&rows=10`
  
        if (filterBy && filterText) {
          url += `&filterBy=${filterBy}&search=${filterText}`
        }
  
        const response = await Request.get(url, true)
    
        setTotalOfPages(response.data.last_page)
        setPage(response.data.current_page)
  
        const list: ClientObject[] = []
  
        await response.data.data.map((client: any) => {
          const newClient: ClientObject = {
            id: client.id,
            firstName: client.first_name,
            lastName: client.last_name,
            email: client.email,
            phoneNumber: client.phone_number,
            status: client.client_status.description,
            createdBy: client.created_by.first_name + " " + client.created_by.last_name,
            createdAt: HelperFunctions.timeFormater(client.created_at),
          }
  
          list.push(newClient)
        });
  
        if (list.length) {
          const emptyList: ClientObject[] = []
          setClients(emptyList)
          setClients(list)
        }
        
        setIsLoading(false)
      } catch (error) {
        console.log(`error`)
        setIsLoading(false)
      }
  }

  const handlePageChange = async (value: number) => {
    setPage(value)
    await getClientList(value)
  }

  const handleFilterChange = async (value: any) => {
    setFilterBy(value.field)
  }

  const handleFilterTextChange = async (value: string) => {
    setFilterText(value)
  }

  const applyFilters = async () => {
    await getClientList(page)
  }

  if (isLoading) {
    return (
      <PageLoadingSpinner
        title="Client List"
      />
    )
  }

  return (
    <PageLayout title='Client List'>
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
          clients.map((client: any) => {
            if (client.id !== undefined) {
              return (
                <div key={`product-accordion-${client.id}`} className="client-list-accordion">
                    <ClientAccordion 
                        id={client.id}
                        firstName={client.firstName}
                        lastName={client.lastName}
                        email={client.email}
                        phoneNumber={client.phoneNumber}
                        status={client.status}
                        createdBy={client.createdBy}
                        createdAt={client.createdAt}
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