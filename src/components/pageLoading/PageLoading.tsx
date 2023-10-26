import React, { useState, useEffect, Fragment } from "react"
import PageLayout from "../pageLayout/PageLayout"
import Spinner from "../spinner/Spinner"
import PageLoadingSpinnerProps from "./PageLoadingSpinnerProps"

const PageLoadingSpinner: React.FC<PageLoadingSpinnerProps> = (props) => {
    return (
        <PageLayout title={props.title}>
            <div style={{marginTop: '16rem'}}>
                <Spinner
                    width="200px"
                    height="200px"
                />
            </div>
        </PageLayout>
    )
   
}

export default PageLoadingSpinner