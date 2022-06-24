import React, { useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tooltip,
  Image
} from '@chakra-ui/react'
import { useQuery } from "@apollo/client"
import { LIQUIDATIONS_DATA } from '../../apollo/queries.js'
import { formatDate } from '../../utils'


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
 <TableContainer mt={15}>
      <Table variant='simple' fontSize={14}>
        {/*<TableCaption></TableCaption>*/}
        <Thead>
          <Tr>
            <Th>Time</Th>
            <Th>Liquidatee</Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        {liquidationsLoading 
          ? 'Loading Liquidations...' 
          : liquidationsData.liquidationEvents.map(({ blockTime, from } : liquidationsData_liquidationEvents) => (
          <Tbody>
            <Tr>
              <Td>{formatDate(blockTime)}</Td>
              <Td>{from}</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          </Tbody>
          )
        )}
        <Tfoot>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}



export default Liquidations