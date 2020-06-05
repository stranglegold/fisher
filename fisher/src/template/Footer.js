import React from 'react'

export default function Footer(){
    return(
        <div id="MyFooter" className="w-100 text-center bg-primary text-white">
            <p className="pt-3 pr-0 pl-0 pb-0 font-weight-bold h4">Fisherman application</p>
            <p className="pt-0 pr-0 pl-0 pb-3 font-weight-bold h4">{new Date().getFullYear()}</p>
        </div>
    )
}