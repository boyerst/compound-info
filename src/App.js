import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Landing from './components/Landing'
import Header from './components/Header'







function App() {

  const [isLanded, setIsLanded] = useState(true)

  const handleIsLanded = () => {
    setIsLanded(false)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />

          {isLanded && <Landing handleIsLanded={handleIsLanded} /> }

        </Grid>
        <Header />
      </Box>
    </ChakraProvider>
  );
}

export default App;
