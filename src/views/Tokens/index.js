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
} from '@chakra-ui/react'
import { useQuery } from "@apollo/client"
import { TOKENS_DATA } from '../../apollo/queries.js'





const Tokens = () => {

  const { loading: tokensLoading, error: tokensError, data: tokensData, startPolling: tokensPolling } = useQuery(TOKENS_DATA, {
    fetchPolicy: 'cache-and-network', onCompleted: updateMe() })
  const cash = tokensData && tokensData.markets[0].cash
  console.log(cash)

  useEffect(() => {
    tokensPolling(1000)
  })

  // Temporary functions until find pollInterval fix
  function updateMe() {
    console.log("Queried TOKENS_DATA")
  }

  return (
    <TableContainer>
      <Table variant='simple'>
        {/*<TableCaption></TableCaption>*/}
        <Thead>
          <Tr>
            <Th>Asset</Th>
            <Th>TVL</Th>
            <Th>Borrow Rate</Th>
            <Th>Supply Rate</Th>
            <Th>cToken</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>USDC</Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
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



export default Tokens