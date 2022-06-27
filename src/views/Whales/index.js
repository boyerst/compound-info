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
import { BORROWS_DATA } from '../../apollo/queries.js'
import { formatDate, formatNum } from '../../utils'


const Whales = () => {

  const { loading: whalesLoading, error: whalesError, data: whalesData, startPolling: whalesPolling } = useQuery(BORROWS_DATA, {
    fetchPolicy: 'cache-and-network', onCompleted: queryNotification() })

  console.log("Liquidations Data: ",whalesData)

  useEffect(() => {
    whalesPolling(1000)
  })
  
  // Temporary functions until find pollInterval fix
  function queryNotification() {
    console.log("Queried BORROWS_DATA")
  }
  


  return (
    <Box>
    {
      whalesLoading 
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
        <Table variant='simple' fontSize={14} size='md'>
          <TableCaption>Last Updated: {new Date().toLocaleTimeString()}</TableCaption>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          {whalesData.borrowEvents.map(({ 
            id,
            borrower,
            accountBorrows,
            blockTime,
            underlyingSymbol,
            amount
              } : whalesData_borrowEvents) => (
            <Tbody key={id}>
              <Tr>
                <Td>{formatDate(blockTime)}</Td>
                <Td>
{/*                  <Link href={'https://etherscan.io/address/' + } _hover={{ color: '#00E699' }} isExternal>
                    {from ? from.substring(0, 6) : '0x0'}
                    ...
                    {from ? from.substring(38, 42) : ''}
                  </Link>*/}
                </Td>
                <Td>{underlyingSymbol}</Td>
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
    }
    </Box>
  )
}


export default Whales