import React, { useState } from 'react'
import {
  useColorMode, 
  useColorModeValue, 
  IconButton,
  Box, 
  Flex, 
  Menu,
  Stack,
  Link,
  Wrap,
  Spacer,
  HStack

} from '@chakra-ui/react'
import { Icon, CheckCircleIcon, WarningIcon, CircleIcon } from '@chakra-ui/icons'
import { FaMoon, FaSun } from 'react-icons/fa'
import { formatUSD } from '../../utils'
import { useQuery } from "@apollo/client"
import { META_DATA, ETH_DATA } from '../../apollo/queries.js'




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

  const { loading: metaLoading, error: metaError, data: metaData } = useQuery(META_DATA)
  const blockNumber = metaData && metaData._meta.block.number
  const subgraphStatus = metaData && metaData._meta.hasIndexingErrors

  console.log(subgraphStatus)

  


  const { loading: ethDataLoading, error: ethDataError, data: ethData } = useQuery(ETH_DATA, {
    pollInterval: 100
  })
  const ethPrice = ethData && ethData.markets[0].underlyingPriceUSD

    



  
 




  return (
    <Box>
      <HStack h={10} >
        <Link href={'https://etherscan.io/block/' + blockNumber} isExternal>
          <Box borderRadius={8} fontSize={12} bg='gray.500' ml={3} px={3}>Latest Synced Block: {blockNumber}
            <CircleIcon mb={.5} ml={1} boxSize={2}/>
          </Box>
        </Link>
        <Box fontSize={12} >ETH Price: ${formatUSD(ethPrice)}</Box>
        <Spacer />
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
