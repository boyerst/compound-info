import React from 'react'
import Utils from '../../utils'
import { useQuery } from "@apollo/client"
import { META_DATA } from '../../apollo/queries.js'


function Header() {

  const { loading: metaLoading, error: metaError, data: metaData } = useQuery(META_DATA)
  const blockNumber = metaData && metaData._meta.block.number
  console.log("blockNumber: ", blockNumber)

  
}




export default Header