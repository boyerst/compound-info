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
import { formatDate, formatNum } from '../../utils'


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
            <Th>Collateral</Th>
            <Th textTransform='none'>cTOKENS SEIZED</Th>
            <Th textTransform='none'>cTOKEN</Th>
            <Th>Liquidator</Th>
            <Th textAlign='center'>Collateral Repaid</Th>
            {/*<Th>Collateral</Th>*/}
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        {liquidationsLoading 
          ? 'Loading Liquidations...' 
          : liquidationsData.liquidationEvents.map(({ 
              blockTime, 
              from, 
              amount, 
              cTokenSymbol, 
              to,
              underlyingRepayAmount, 
              underlyingSymbol 
            } : liquidationsData_liquidationEvents) => (
          <Tbody>
            <Tr>
              <Td>{formatDate(blockTime)}</Td>
              <Td>
                {from ? from.substring(0, 6) : '0x0'}
                ...
                {from ? from.substring(38, 42) : ''}
              </Td>
              <Td>{underlyingSymbol}</Td>
              <Td>{formatNum(amount)} {cTokenSymbol}</Td>
              <Td>{cTokenSymbol}</Td>
              <Td>
                {to ? to.substring(0, 6) : '0x0'}
                ...
                {to ? to.substring(38, 42) : ''}
              </Td>
              <Td textAlign='center'>{formatNum(underlyingRepayAmount)} {underlyingSymbol}</Td>
              {/*<Td>{underlyingSymbol}</Td>*/}
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