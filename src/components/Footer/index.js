import React from 'react'
import {
  Box, 
  Container,
  Button, 
  Text,
  Stack
} from '@chakra-ui/react'
import { FaTwitter, FaDiscord } from 'react-icons/fa';




const Footer = () => {

  return (
    <Box>
      <Container
        as={Stack}
        maxW={'9xl'}
        px={8}
        pb={10}
        sx={{position: 'absolute', bottom: '0'}}
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        align={'center'}
      >
      <Text fontSize={12}>© 2022 Compound.Info</Text>
        <Stack direction='row'>
          <Button  leftIcon={<FaDiscord />} rounded={'full'} size='xs'>
            Discord
          </Button>
          <Button colorScheme='twitter' leftIcon={<FaTwitter />} rounded={'full'} size='xs'>
            Twitter
          </Button>
         </Stack>
       
      </Container>
      
    </Box>

  )   
}



export default Footer