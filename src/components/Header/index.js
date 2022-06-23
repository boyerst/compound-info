import React, { useEffect } from 'react'
import {
  useColorMode, 
  useColorModeValue, 
  IconButton,
  Box,  
  Link,
  Spacer,
  HStack
} from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { FaMoon, FaSun } from 'react-icons/fa'
import { formatNum } from '../../utils'
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

  const { loading: metaLoading, error: metaError, data: metaData, startPolling: metaPolling } = useQuery(META_DATA, {
    fetchPolicy: 'cache-and-network', onCompleted: updateMeMeta() })
  const blockNumber = metaData && metaData._meta.block.number
  const subgraphStatus = metaData && metaData._meta.hasIndexingErrors


  const { loading: ethDataLoading, error: ethDataError, data: ethData, startPolling: ethPolling } = useQuery(ETH_DATA, { 
    fetchPolicy: 'cache-and-network', onCompleted: updateMeEth() })
  const ethPrice = ethData && ethData.markets[0].underlyingPriceUSD

  useEffect(() => {
    ethPolling(1000)
    metaPolling(1000)
  })

  // Temporary functions until find pollInterval fix
  function updateMeEth() {
    console.log("Queried ETH_DATA")
  }
  function updateMeMeta() {
    console.log("Queried META_DATA")
  }

    



  return (
    <Box>
      <HStack h={10} >
        <Link href={'https://etherscan.io/block/' + blockNumber} isExternal>
          <Box borderRadius={8} fontSize={12} bg='gray.500' ml={3} px={3}>
            {metaLoading ?  'Loading...' : 'Latest Synced Block: '} {blockNumber} 
            <CircleIcon mb={.5} ml={1} boxSize={2}/>
          </Box>
        </Link>
        <Box fontSize={12}>
          {ethDataLoading ? 'Loading...' : 'ETH Price: '} ${formatNum(ethPrice)}
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

