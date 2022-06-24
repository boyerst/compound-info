import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react'
import { useQuery } from "@apollo/client"
import { LIQUIDATIONS_DATA } from '../../apollo/queries.js'


const Liquidations = () => {

  const { loading: liquidationsLoading, error: liquidationsError, data: liquidationsData, startPolling: liquidationsPolling } = useQuery(LIQUIDATIONS_DATA, {
    fetchPolicy: 'cache-and-network', onCompleted: updateMe() })
  const liquidations = liquidationsData && liquidationsData.markets

  console.log(liquidationsData)

  useEffect(() => {
    liquidationsPolling(1000)
  })
  
  // Temporary functions until find pollInterval fix
  function updateMe() {
    console.log("Queried LIQUIDATIONS_DATA")
  }
  

  return (
    <Box>
      LIQUIDATIONS
    </Box>
  )
}



export default Liquidations