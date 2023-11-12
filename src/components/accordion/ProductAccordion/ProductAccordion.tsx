import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import ProductAccordionProps from './ProductAccordionProps';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import "./ProductAccordion.css"

const ProductAccordion: React.FC<ProductAccordionProps> = ({id, name, price, code, createdBy, createdAt, updatedAt, status, quantity}) => {
    const accordionId = `product-accordion-${id}`
    const navigate = useNavigate();

    const editProduct = () => {
        navigate(`/product/${id}`)
    }

    return (
        <div>
            <Accordion style={{border: 'solid 1px gray', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={accordionId}
                >
                    <div className='productAccordionTitleContainer'>
                        <span style={{marginRight: '10px'}} className='productAccordionTitle productAccordionTitleLeft'>{`Code: ${code}`}</span>
                        <span className='productAccordionTitle productAccordionTitleLeft'>{name}</span>
                        <span className='productAccordionTitle productAccordionTitleRight'>{status}</span>
                        <span className='productAccordionTitle productAccordionTitleRight'>{`Price: $ ${price}`}</span>
                    </div>
                    
                </AccordionSummary>
                <AccordionDetails>
                    <hr />
                    <br />
                    <div>
                        <Button onClick={editProduct} variant="contained">Edit Product</Button>
                    </div>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item sm={12} xs={12} md={6}>
                            <div>
                                <label className='productAccordionLabel' htmlFor="">Product name:</label>
                                <span>{ name }</span>
                            </div>
                            <br/>
                            <div>
                                <label className='productAccordionLabel' htmlFor="">Product price:</label>
                                <span>{ price }</span>
                            </div>
                            <br/>
                            <div>
                                <label className='productAccordionLabel' htmlFor="">Product code:</label>
                                <span>{ code }</span>
                            </div>
                            <br/>
                            <div>
                                <label className='productAccordionLabel' htmlFor="">Created By:</label>
                                <span> {createdBy} </span>
                            </div>
                        </Grid>
                        <Grid item sm={12} xs={12}  md={6}>
                            <div>
                                <label className='productAccordionLabel' htmlFor="">Quantity:</label>
                                <span>{ quantity }</span>
                            </div>
                            <br/>
                            <div>
                                <label className='productAccordionLabel' htmlFor="">Status:</label>
                                <span>{ status }</span>
                            </div>
                            <br/>
                            <div>
                                <label className='productAccordionLabel' htmlFor="">Updated At:</label>
                                <span>{ createdAt }</span>
                            </div>
                            <br/>  
                            <div>
                                <label className='productAccordionLabel' htmlFor="">Created At:</label>
                                <span>{ updatedAt }</span>
                            </div>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default ProductAccordion