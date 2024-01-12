import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import ClientAccordionProps from './ClientAccordionProps';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import "./ClientAccordion.css"

const ClientAccordion: React.FC<ClientAccordionProps> = ({id, firstName, lastName, email, createdBy, createdAt, phoneNumber, status}) => {
    const accordionId = `client-accordion-${id}`
    const navigate = useNavigate();

    const editProduct = () => {
        navigate(`/client/${id}`)
    }

    return (
        <div>
            <Accordion style={{border: 'solid 1px gray', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={accordionId}
                >
                    <div className='clientAccordionTitleContainer'>
                        <span className='clientAccordionTitle clientAccordionTitleLeft'>{`${firstName} ${lastName}`}</span>
                        <span className='clientAccordionTitle clientAccordionTitleRight'>{status}</span>
                    </div>
                    
                </AccordionSummary>
                <AccordionDetails>
                    <hr />
                    <br />
                    <Grid container spacing={2}>
                        <Grid item sm={12} xs={12} md={6}>
                            <div>
                                <label className='clientAccordionLabel' htmlFor="">First Name:</label>
                                <span>{ firstName }</span>
                            </div>
                            <br/>
                            <div>
                                <label className='clientAccordionLabel' htmlFor="">Last Name:</label>
                                <span>{ lastName }</span>
                            </div>
                            <br/>
                            <div>
                                <label className='clientAccordionLabel' htmlFor="">Email Address:</label>
                                <span>{ email }</span>
                            </div>
                            <br/>
                            <div>
                                <label className='clientAccordionLabel' htmlFor="">Phone Number:</label>
                                <span> {phoneNumber} </span>
                            </div>
                        </Grid>
                        <Grid item sm={12} xs={12}  md={6}>
                            <div>
                                <label className='clientAccordionLabel' htmlFor="">Created By:</label>
                                <span>{ createdBy }</span>
                            </div>
                            <br/>
                            <div>
                                <label className='clientAccordionLabel' htmlFor="">Status:</label>
                                <span>{ status }</span>
                            </div>
                            <br/>
                            <div>
                                <label className='clientAccordionLabel' htmlFor="">Updated At:</label>
                                <span>{ createdAt }</span>
                            </div>
                        </Grid>
                    </Grid>
                    <br />
                    <div>
                        <Button onClick={editProduct} style={{width:'100%'}} variant="contained">Edit Client</Button>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default ClientAccordion