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
import { InfoOutlineIcon } from '@chakra-ui/icons'
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

  // Working logic to insert Token icons into Symbol column
  function importAll(r) {
    let images = {}
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); })
    return images
  }
  const images = importAll(require.context('../../assets', false, /\.(png|jpe?g|svg)$/));
  console.log(images)
  const AaveKey = images[Object.keys(images)[0]]
  const AaveName = Object.keys(images)[0]
  console.log(AaveKey)
  console.log(AaveName)



  return (
    <TableContainer mt={15}>
      <Table variant='simple' fontSize={14}>
        {/*<TableCaption></TableCaption>*/}
        <Thead>
          <Tr>
            <Th>Asset</Th>
            <Th>Symbol</Th>
            <Th>Price</Th>
            <Th textAlign='center'>TVL (Ξ)</Th>
            <Th>cToken</Th>
            <Th textAlign='center'>Supply Rate (Annual)</Th>
            <Th textAlign='center'>Borrow Rate (Annual)</Th>
            <Th>Total Borrowed</Th>
            <Th>
              Borrow Index
              <Tooltip hasArrow placement='auto' closeDelay={500} label='The history of the markets borrow index return (Think S&P 500)'>
                <InfoOutlineIcon ml={1} mb={1}/>
              </Tooltip>
            </Th>

          </Tr>
        </Thead>
        {tokensLoading 
          ? 'Loading Tokens...' 
          : tokensData.markets.map(({ id, cash, name, symbol, underlyingSymbol, underlyingName, underlyingPriceUSD, supplyRate, borrowRate, totalBorrows, borrowIndex } : tokensData_markets) => (
          <Tbody  key={id}>
            <Tr>
              <Td fontWeight='extrabold'>{underlyingName}</Td>
              <Td sx={{display: 'flex'}}>
                <Image src={AaveKey} mr={1} htmlHeight='15' htmlWidth='15'/>
                {underlyingSymbol}
              </Td>
              <Td>$ {formatNum(underlyingPriceUSD)}</Td>
              <Td>{formatNum(cash)}</Td>
              <Td>{symbol}</Td>
              <Td textAlign='center'>{formatPercentage(supplyRate)} %</Td>
              <Td textAlign='center'>{formatPercentage(borrowRate)} %</Td>
              <Td>{formatNum(totalBorrows)} {underlyingSymbol}</Td>
              <Td textAlign='center'>{formatNum(borrowIndex)}</Td>
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
