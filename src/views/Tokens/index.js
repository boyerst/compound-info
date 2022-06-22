import React from 'react';
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



const Tokens = () => {

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