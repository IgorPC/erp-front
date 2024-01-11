import React, {Fragment, useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import PageLayout from '../../../components/pageLayout/PageLayout';
import Grid from '@mui/material/Grid';
import DefaultBox from "../../../components/box/DefaultBox";
import DefaultDivider from '../../../components/divider/DefaultDivider';
import TextInput from '../../../components/inputs/textInput/TextInput';
import PageLoadingSpinner from "../../../components/pageLoading/PageLoading";
import DefaultAlert from "../../../components/alert/DefaultAlert";
import Request from "../../../requests/Request";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import SelectInput from "../../../components/inputs/select/SelectInput";

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    interface ClientStatusInterface {
        field: string,
        value: string,
    }
    
    interface ClientStatusResponse {
        id: string,
        description: string,
    }

    const [clientId, setClientId] = useState(0)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
      const [status, setStatus] = useState({
        field: "",
        value: ""
    })
    const [street, setStreet] = useState("")
    const [number, setNumber] = useState("")
    const [neighborhood, setNeighborhood] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [zipCode, setZipCode] = useState("")

    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [phoneNumberError, setPhoneNumberError] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [statusList, setStatusList] = useState<ClientStatusInterface[]>([])

    useEffect(() => {
        getClient(id)
    }, [])

    const getClient = async (id: any) => {
        try {
            setIsLoading(true)
      
            const response = await Request.get(`/client/${id}`, true)
            
            await setClient(
                response.data.data.id,
                response.data.data.first_name,
                response.data.data.last_name,
                response.data.data.email,
                response.data.data.phone_number,
                response.data.data.client_status.id,
                response.data.data.client_status.id
            )

            if (response.data.data.client_address) {
                await setAddress(
                    response.data.data.client_address.street,
                    response.data.data.client_address.number,
                    response.data.data.client_address.neighborhood,
                    response.data.data.client_address.city,
                    response.data.data.client_address.country,
                    response.data.data.client_address.zip_code
                )
       
            }
           
            const statusResponse = await Request.get(`/client-status`, true)
            await fillStatusList(statusResponse.data)
      
            setIsLoading(false)
          } catch (error) {
            console.log(`error`)
            setIsLoading(false)
          }
    }

    const fillStatusList = async (listOfStatus: Array<ClientStatusResponse>) => {

        const list: ClientStatusInterface[] = []
    
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

    const setClient = async (clientId: number, firstName: string, lastName: string, email: string, phoneNumber: string, statusId: string, statusDescription: string) => {
        setClientId(clientId)
        setFirstName(firstName)
        setLastName(lastName)
        setEmail(email)
        setPhoneNumber(phoneNumber)
        if (statusId && statusDescription) {
            setStatus({
              field: statusId,
              value: statusDescription
            })
        }
    }

    const setAddress = async (street: string, number: string, neighborhood: string, city: string, country: string, zipCode: string) => {
        setStreet(street ? street : "")
        setNumber(number ? number : "")
        setNeighborhood(neighborhood ? neighborhood : "")
        setCity(city ? city : "")
        setCountry(country ? country : "")
        setZipCode(zipCode ? zipCode : "")
    }

    const handleFirstName = (value: string) => {
        setFirstNameError("")
        setFirstName(value)
    }

    const handleLastName = (value: string) => {
        setLastNameError("")
        setLastName(value)
    }

    const handleEmail = (value: string) => {
        setEmailError("")
        setEmail(value)
    }

    const handlePhoneNumber = (value: string) => {
        setPhoneNumberError("")
        setPhoneNumber(value)
    }

    const handleStreet = (value: string) => {
        setStreet(value)
    }

    const handleNumber = (value: string) => {
        setNumber(value)
    }

    const handleNeighborhood = (value: string) => {
        setNeighborhood(value)
    }

    const handleCity = (value: string) => {
        setCity(value)
    }

    const handleCountry = (value: string) => {
        setCountry(value)
    }

    const handleZipCode = (value: string) => {
        setZipCode(value)
    }

    const handleStatus = (status: any) => {
        if (status.field !== undefined && status.value !== undefined) {
          setStatus(status)
        }
      }

    const validateFields = async () => {
        let error = false

        if (! firstName.length) {
          setFirstNameError("First Name can not be empty")
          error = true
        }
    
        if (! lastName.length) {
          setLastNameError("Last Name can not be empty")
          error = true
        }
    
        if (! email.length) {
          setEmailError("Email can not be empty")
          error = true
        }

        if (! email.includes("@")) {
            setEmailError("Invalid Email")
            error = true
          }
    
        if (! phoneNumber.length) {
          setPhoneNumberError("Phone Number can not be empty")
          error = true
        }
    
        return error
    }

    const shouldSaveAddress = async () => {
        if (street.length) {
            return true
        }

        if (number.length) {
            return true
        }

        if (neighborhood.length) {
            return true
        }

        if (city.length) {
            return true
        }

        if (country.length) {
            return true
        }

        if (zipCode.length) {
            return true
        }

        return false;
    }

    const saveProduct = async () => {
        const hasError = await validateFields()
    
        if (hasError) {
          return false;
        }

        const clientBody = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phoneNumber,
            status_id: status.field
        }
    
        setIsLoading(true)
    
        const response = await Request.put(`/client/${id}`, clientBody, true);
      
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

        if (await shouldSaveAddress) {
            const clientAddressBody = {
                client_id: id,
                street: street,
                number: number,
                neighborhood: neighborhood,
                city: city,
                country: country,
                zip_code: zipCode,
            }

            const addressResponse = await Request.post(`/client-address`, clientAddressBody, true);
        
            if (! addressResponse) {
                setError("Internal Server Error")
                setIsLoading(false)
                return false
              }
          
              if (! addressResponse.data.success) {
                  setError(response.data.data)
                  setIsLoading(false)
                  return false
              }
        }
    
        setSuccess("Client sucessfully updated")
        setIsLoading(false)
      }

    if (isLoading) {
        return (
            <PageLoadingSpinner
                title="Edit Client"
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
        <PageLayout title='Edit Client'>
          <div>
            { alert }
            <Grid container spacing={2}>
              <Grid item md={12} sm={12} xs={12}>
                <DefaultBox>
                  <DefaultDivider
                    title="Client Personal Data"
                  />
                  <br />
                  <Grid container spacing={2}>
                    <Grid item md={6} sm={6} xs={12}>
                      <TextInput
                        name="First Name"
                        type="text"
                        callback={handleFirstName}
                        error={firstNameError}
                        value={firstName}
                        required={true}
                      />
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                      <TextInput
                        name="Last Name"
                        type="text"
                        callback={handleLastName}
                        error={lastNameError}
                        value={lastName}
                        required={true}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container spacing={2}>
                    <Grid item md={6} sm={6} xs={12}>
                        <TextInput
                            name="Email Address"
                            type="text"
                            disabled={true}
                            callback={handleEmail}
                            error={emailError}
                            value={email}
                        />
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <SelectInput
                            name="Client Status"
                            options={statusList}
                            callback={handleStatus}
                            value={{
                                field: status.field,
                                value: status.value
                            }}
                        />
                    </Grid>
                  </Grid>
                  <br />
                  <TextInput
                    name="Phone Number"
                    type="text"
                    callback={handlePhoneNumber}
                    error={phoneNumberError}
                    value={phoneNumber}
                    required={true}
                  />
                  <br />
                  <br />
                  <DefaultDivider
                    title="Client Address"
                  />
                  <br />
                  <Grid container spacing={2}>
                    <Grid item md={6} sm={6} xs={12}>
                      <TextInput
                        name="Street"
                        type="text"
                        callback={handleStreet}
                        error={''}
                        value={street}
                      />
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                      <TextInput
                        name="number"
                        type="text"
                        callback={handleNumber}
                        error={''}
                        value={number}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container spacing={2}>
                    <Grid item md={6} sm={6} xs={12}>
                      <TextInput
                        name="Neighborhood"
                        type="text"
                        callback={handleNeighborhood}
                        error={''}
                        value={neighborhood}
                      />
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                      <TextInput
                        name="City"
                        type="text"
                        callback={handleCity}
                        error={''}
                        value={city}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container spacing={2}>
                    <Grid item md={6} sm={6} xs={12}>
                      <TextInput
                        name="Country"
                        type="text"
                        callback={handleCountry}
                        error={''}
                        value={country}
                      />
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                      <TextInput
                        name="Zip Code"
                        type="text"
                        callback={handleZipCode}
                        error={''}
                        value={zipCode}
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
            </Grid>
          </div>
        </PageLayout>
      );
}

export default EditPage