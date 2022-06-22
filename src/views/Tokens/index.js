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
import { formatNum } from '../../utils'
import { formatPercentage } from '../../utils'





const Tokens = () => {

  const { loading: tokensLoading, error: tokensError, data: tokensData, startPolling: tokensPolling } = useQuery(TOKENS_DATA, {
    fetchPolicy: 'cache-and-network', onCompleted: updateMe() })
  const tokens = tokensData && tokensData.markets

  console.log(tokensData)



  useEffect(() => {
    tokensPolling(1000)
  })

  // Temporary functions until find pollInterval fix
  function updateMe() {
    console.log("Queried TOKENS_DATA")
  }

  return (
    <TableContainer>
      <Table variant='simple' fontSize={14}>
        {/*<TableCaption></TableCaption>*/}
        <Thead>
          <Tr>
            <Th>Asset</Th>
            <Th>Symbol</Th>
            <Th>TVL (ETH)</Th>
            <Th>cToken</Th>
            <Th textAlign='center'>Supply Rate (Annual)</Th>
            <Th textAlign='center'>Borrow Rate (Annual)</Th>
          </Tr>
        </Thead>
        {tokensLoading 
          ? 'Loading Tokens...' 
          : tokensData.markets.map(({ id, cash, name, symbol, underlyingSymbol, underlyingName, supplyRate, borrowRate, totalBorrows } : tokensData_markets) => (
          <Tbody  key={id}>
            <Tr>
              <Td>{underlyingName}</Td>
              <Td>{underlyingSymbol}</Td>
              <Td>{formatNum(cash)}</Td>
              <Td>{symbol}</Td>
              <Td textAlign='center'>{formatPercentage(supplyRate)} %</Td>
              <Td textAlign='center'>{formatPercentage(borrowRate)} %</Td>
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



export default Tokens
