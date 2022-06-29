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
  Tooltip,
  Image
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { useQuery } from "@apollo/client"
import { TOKENS_DATA } from '../../apollo/queries.js'
import { formatNum, formatPercentage } from '../../utils'


import AAVE from '../../assets/AAVE.svg'





const Tokens = () => {

  
  const { loading: tokensLoading, error: tokensError, data: tokensData, startPolling: tokensPolling } = useQuery(TOKENS_DATA, {
    fetchPolicy: 'cache-and-network', onCompleted: onTokensQuery})

  console.log("Tokens Data: ", tokensData)

  useEffect(() => {
    tokensPolling(1000)
    console.log("POLLED")
  })

  function onTokensQuery() {
    console.log("Queried TOKENS_DATA in /Tokens")
    // let contractsTVL = []
    // for (let i = 0; i < tokensData.markets.length; i++) {
    //   const contractBalance = tokensData.markets[i].cash
    //   const underlyingPriceUSDs = tokensData.markets[i].underlyingPriceUSD
    //   const contractTVLUSD = Number(contractBalance * underlyingPriceUSDs)
    //   console.log("tokenTVLUSD: ", contractTVLUSD)
    //   contractsTVL.push(contractTVLUSD)
    //   console.log(contractsTVL)
    //   const compoundTVLUSD = contractsTVL.reduce((a, b) => {
    //     return a + b  
    //   })
    //   console.log("CompoundTVL: ", compoundTVLUSD)
    //   return compoundTVLUSD
    // }
  }

  // console.log(onQuery())


  // Working logic to insert Token icons into Symbol column
  function importAll(r) {
    let images = {}
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); })
    return images
  }
  const images = importAll(require.context('../../assets', false, /\.(png|jpe?g|svg)$/));
  console.log("images: ", images)
  const AaveKey = images[Object.keys(images)[0]]
  const AaveName = Object.keys(images)[0]
  console.log("AaveKey: ", AaveKey)
  console.log("AaveName: ", AaveName)



  return (
    <Box>
    {
      tokensLoading 
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
              <Th>Asset</Th>
              <Th>Token</Th>
              <Th>Price</Th>
              <Th textAlign='center'>TVL (Token)</Th>
              <Th textAlign='center'>TVL (USD)</Th>
              <Th textAlign='center'>Supply Rate (Annual)</Th>
              <Th textAlign='center'>Borrow Rate (Annual)</Th>
              <Th textAlign='center'>Total Borrowed</Th>
              <Th>
                Borrow Index
                <Tooltip hasArrow placement='auto' closeDelay={500} label='The history of the markets borrow index return (Think S&P 500)'>
                  <InfoOutlineIcon ml={1} mb={1}/>
                </Tooltip>
              </Th>
              <Th>cToken</Th>
            </Tr>
          </Thead>
          {tokensData.markets.map(({ 
                id, 
                cash, 
                name, 
                symbol, 
                underlyingSymbol, 
                underlyingName, 
                underlyingPriceUSD, 
                supplyRate, 
                borrowRate, 
                totalBorrows, 
                borrowIndex 
              } : tokensData_markets) => (
            <Tbody  key={id}>
              <Tr>
                <Td fontWeight='bold'>{underlyingName}</Td>
                <Td sx={{display: 'flex'}}>
                  <Image src={AaveKey} mr={1} htmlHeight='15' htmlWidth='15'/>
                  {underlyingSymbol}
                </Td>
                <Td>$ {formatNum(underlyingPriceUSD)}</Td>
                <Td isNumeric>{formatNum(cash)}</Td>
                <Td isNumeric fontWeight='bold'>$ {formatNum(underlyingPriceUSD * cash)}</Td>
                <Td textAlign='center'>{formatPercentage(supplyRate)} %</Td>
                <Td textAlign='center'>{formatPercentage(borrowRate)} %</Td>
                <Td isNumeric>{formatNum(totalBorrows)} {underlyingSymbol}</Td>
                <Td textAlign='center'>{formatNum(borrowIndex)}</Td>
                <Td>{symbol}</Td>
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





export default Tokens
