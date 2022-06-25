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
  Image,
  Center,
  Spinner,
  Flex
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
    <Center>
    {
      liquidationsLoading 
      ? 
      <Spinner 
        size='xl'
        thickness='5px'
        label='Loading...'
        speed='3.65s'
        emptyColor='gray.200'
        color='#00E699'
        sx={{ 
          position: 'absolute',
          top: '50%'}}
      />
      : 
      <TableContainer mt={20} mb={200}>
        <Table variant='simple' fontSize={14} size='lg'>
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
              <Th>Tx Hash - Log Index</Th>
            </Tr>
          </Thead>
          {liquidationsData.liquidationEvents.map(({ 
                blockTime, 
                from, 
                amount, 
                cTokenSymbol, 
                to,
                underlyingRepayAmount, 
                underlyingSymbol,
                id 
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
                <Td textAlign='center'>
                  {id ? id.substring(0, 6) : '0x0'}
                  ...
                  {id ? id.substring(62, 70) : ''}
                </Td>
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
    }
    </Center>
  )
}




export default Liquidations
