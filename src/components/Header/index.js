import React, { useEffect } from 'react'
import {
  useColorMode, 
  useColorModeValue, 
  IconButton,
  Box,  
  Link,
  Spacer,
  HStack, 
  Code
} from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { FaMoon, FaSun } from 'react-icons/fa'
import { formatNum } from '../../utils'
import { useQuery } from "@apollo/client"
import { META_DATA, ETH_DATA, TOKENS_DATA } from '../../apollo/queries.js'




const Header = (props) => {

  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' {...props}>
      <path
        fill={subgraphStatus === false ? 'lightgreen' : 'red'}
        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
      />
    </Icon>
  )


  const { loading: metaLoading, error: metaError, data: metaData, startPolling: metaPolling } = useQuery(META_DATA, {
    fetchPolicy: 'cache-and-network', onCompleted: onMetaQuery() })
  const blockNumber = metaData && metaData._meta.block.number
  const subgraphStatus = metaData && metaData._meta.hasIndexingErrors


  const { loading: ethDataLoading, error: ethDataError, data: ethData, startPolling: ethPolling } = useQuery(ETH_DATA, { 
    fetchPolicy: 'cache-and-network', onCompleted: onEthQuery() })
  const ethPrice = ethData && ethData.markets[0].underlyingPriceUSD

  const { loading: tokensLoading, error: tokensError, data: tokensData, startPolling: tokensPolling } = useQuery(TOKENS_DATA, {
    fetchPolicy: 'cache-and-network', onCompleted: onTokensQuery})

  function onTokensQuery() {
    console.log("Queried TOKENS_DATA")
    let contractsTVL = []
    for (let i = 0; i < tokensData.markets.length; i++) {
      const contractBalance = tokensData.markets[i].cash
      const underlyingPriceUSDs = tokensData.markets[i].underlyingPriceUSD
      const contractTVLUSD = Number(contractBalance * underlyingPriceUSDs)
      console.log("tokenTVLUSD: ", contractTVLUSD)
      contractsTVL.push(contractTVLUSD)
      console.log(contractsTVL)
      const compoundTVLUSD = contractsTVL.reduce((a, b) => {
        return a + b  
      })
      console.log("CompoundTVL: ", compoundTVLUSD)
      return compoundTVLUSD
    }
  }

  console.log(onTokensQuery())


  useEffect(() => {
    ethPolling(1000)
    metaPolling(1000)
  })

  // Temporary functions until find pollInterval fix
  function onEthQuery() {
    console.log("Queried ETH_DATA")
  }
  function onMetaQuery() {
    console.log("Queried META_DATA")
  }




  return (
    <Box>
      <HStack h={10} >
        <Link href={'https://etherscan.io/block/' + blockNumber} isExternal>
          <Box borderRadius={12} fontSize={12} border='1px' borderColor='gray.600' px={3} py={.5} ml={3}>
            {metaLoading ?  'Loading...' : 'Latest Synced Block: '} {blockNumber} 
            <CircleIcon mb={.5} ml={1} boxSize={2}/>
          </Box>
        </Link>
        <Box borderRadius={12} fontSize={12} border='1px' borderColor='gray.600' px={3} py={.5}>
          {ethDataLoading ? 'Loading...' : 'ETH Price: '} ${formatNum(ethPrice)}
        </Box>
        <Box borderRadius={12} fontSize={12} border='1px' borderColor='gray.600' px={3} py={.5}>
          TVL: ${formatNum(onTokensQuery())}
        </Box>
        <Spacer />
        <Link fontSize={16} px={2} href='https://compound.finance/docs' rel='noopener noreferrer' isExternal>
          Docs
        </Link>
        <Link fontSize={16} pr={8} href='https://compound.finance' rel='noopener noreferrer' isExternal>
          App
        </Link>
        <IconButton
          size='md'
          fontSize='lg'
          aria-label={`Switch to ${text} mode`}
          variant='ghost'
          color='current'
          mt={3}
          mr={4}
          onClick={toggleColorMode}
          icon={<SwitchIcon />}
          {...props}
        />
      </HStack>
    </Box>
  )

}




export default Header

