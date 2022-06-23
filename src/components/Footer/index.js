import React from 'react'
import {
  Box, 
  Container,
  Button, 
  HStack
} from '@chakra-ui/react'
import { FaTwitter, FaDiscord } from 'react-icons/fa';




const Footer = () => {

  return (
    <Box>
      <Container>
        <HStack>
          <Button  leftIcon={<FaDiscord />} rounded={'full'} size='xs'>
            Discord
          </Button>
          <Button colorScheme='twitter' leftIcon={<FaTwitter />} rounded={'full'} size='xs'>
            Twitter
          </Button>
         </HStack>
       
      </Container>
      
    </Box>

  )   
}



export default Footer