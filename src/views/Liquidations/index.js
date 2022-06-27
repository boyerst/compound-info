import React, { useEffect } from 'react';
import {
  Box,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link, 
  Tooltip
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { useQuery } from "@apollo/client"
import { LIQUIDATIONS_DATA } from '../../apollo/queries.js'
import { formatDate, formatNum } from '../../utils'


const Liquidations = () => {

  const { loading: liquidationsLoading, error: liquidationsError, data: liquidationsData, startPolling: liquidationsPolling } = useQuery(LIQUIDATIONS_DATA, {
    fetchPolicy: 'cache-and-network', onCompleted: queryNotification() })
  const liquidations = liquidationsData && liquidationsData.markets

  console.log(liquidationsData)

  useEffect(() => {
    liquidationsPolling(1000)
  })
  
  // Temporary functions until find pollInterval fix
  function queryNotification() {
    console.log("Queried LIQUIDATIONS_DATA")
  }
  


  return (
    <Box>
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
      <TableContainer mt={15} mb={200}>
        <Table variant='simple' fontSize={14} size='lg'>
          {/*<TableCaption></TableCaption>*/}
          <Thead>
            <Tr>
              <Th>Time</Th>
              <Th>Liquidatee</Th>
              <Th>Collateral</Th>
              <Th textTransform='none'>cTOKENS SEIZED</Th>
              <Th>Liquidator</Th>
              <Th textAlign='center'>
                Collateral Repaid
                <Tooltip hasArrow placement='auto' closeDelay={500} label='Underlying cToken amount that was repaid by liquidator'>
                  <InfoOutlineIcon ml={1} mb={1}/>
                </Tooltip>
              </Th>
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
            <Tbody key={id}>
              <Tr>
                <Td>{formatDate(blockTime)}</Td>
                <Td>
                  <Link href={'https://etherscan.io/address/' + from} _hover={{ color: '#00E699' }} isExternal>
                    {from ? from.substring(0, 6) : '0x0'}
                    ...
                    {from ? from.substring(38, 42) : ''}
                  </Link>
                </Td>
                <Td>{underlyingSymbol}</Td>
                <Td fontWeight='bold'>{formatNum(amount)} {cTokenSymbol}</Td>
                <Td>
                  <Link href={'https://etherscan.io/address/' + to} _hover={{ color: '#00E699' }} isExternal>
                    {to ? to.substring(0, 6) : '0x0'}
                    ...
                    {to ? to.substring(38, 42) : ''}
                  </Link>
                </Td>
                <Td textAlign='center'>{formatNum(underlyingRepayAmount)} {underlyingSymbol}</Td>
                <Td textAlign='center'>
                  <Link href={'https://etherscan.io/tx/' + id.substring(0, 66)} _hover={{ color: '#00E699' }} isExternal >
                    {id ? id.substring(0, 6) : '0x0'}
                    ...
                    {id ? id.substring(62, 70) : ''}
                  </Link>
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
    </Box>
  )
}





export default Liquidations
