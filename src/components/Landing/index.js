import React from 'react';
import {
  Text,
  Link,
  Button,
  VStack,
  Code,
  Grid
} from '@chakra-ui/react';
import { Logo } from './Logo';





const Landing = props => {
  console.log(props)

  return (
    <VStack spacing={14} mt={235}>
      <Logo mb={10} h="40vmin" pointerEvents="none" />
      <Text fontSize="xl" fontWeight="extrabold">
        compound.info
      </Text>
      <Link
        onClick={(event) => props.handleIsLanded(event)} 
      >
        <Code color="teal.500" fontSize="md">Enter App</Code>
      </Link>
    </VStack>
  )
}



export default Landing