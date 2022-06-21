import React from 'react'
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
import { FaMoon, FaSun } from 'react-icons/fa'
import Utils from '../../utils'
import { useQuery } from "@apollo/client"
import { META_DATA, ETH_DATA } from '../../apollo/queries.js'




const Header = (props) => {

  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);


  const { loading: metaLoading, error: metaError, data: metaData } = useQuery(META_DATA)
  const blockNumber = metaData && metaData._meta.block.number

  const { loading: ethDataLoading, error: ethDataError, data: ethData } = useQuery(ETH_DATA)
  const ethPrice = ethData && ethData.markets[0].underlyingPriceUSD
  console.log(ethPrice)




  return (
    <Box>
      <HStack h={10} >
        <Link href={'https://etherscan.io/block/' + blockNumber} isExternal>
          <Box borderRadius={8} fontSize={12} bg='gray.500' ml={3} px={3}>Latest Synced Block: {blockNumber}</Box>
        </Link>
        <Box fontSize={12} >ETH Price: ${ethPrice}</Box>
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
