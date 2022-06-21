import React from 'react'
import {
  useColorMode, 
  useColorModeValue, 
  IconButton,
  Box, 
  Flex, 
  Menu,
  Stack,
  Link

} from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'
import Utils from '../../utils'
import { useQuery } from "@apollo/client"
import { META_DATA } from '../../apollo/queries.js'




const Header = (props) => {

  const { loading: metaLoading, error: metaError, data: metaData } = useQuery(META_DATA)
  const blockNumber = metaData && metaData._meta.block.number
  // const blockNumberURL = {'https://etherscan.io/block' + {blockNumber}}
  

  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Box>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Link href={'https://etherscan.io/block/' + blockNumber} isExternal>
            <Box borderRadius={8} fontSize={12} bg='gray.500' ml={3} px={3}>Latest Synced Block: {blockNumber}</Box>
          </Link>
          <Flex alignItems={'center'}>
            <Stack direction={'row'}>
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                pr="4"
                onClick={toggleColorMode}
                icon={<SwitchIcon />}
                {...props}
              />
            </Stack>
  
          </Flex>    
      </Flex>
    </Box>
  )


}




export default Header