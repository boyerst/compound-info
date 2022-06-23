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
        pt={110}
        pb={10}
        // sx={{marginTop: 'auto'}}
        direction={{ base: 'column', md: 'row' }}
        // spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        // align={{ base: 'center', md: 'center' }}
        align={'center'}
      >
      <Text fontSize={14}>© 2022 Compound.Info</Text>
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