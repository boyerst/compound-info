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
import TabsGroup from './components/TabsGroup'
import Footer from './components/Footer'








function App() {

  const [isLanded, setIsLanded] = useState(true)

  const handleIsLanded = () => {
    setIsLanded(false)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign='center' minHeight='100vh'>
        {/*<Grid minH="100vh" p={3}>*/}
          {/*<ColorModeSwitcher justifySelf="flex-end" />*/}

          { isLanded 
            ? <Landing handleIsLanded={handleIsLanded} />
            : 
              <Box>
                <Header />
                <TabsGroup />
                <Footer />
              </Box>
          }

     {/*   </Grid>*/}
      </Box>
    </ChakraProvider>
  );
}

export default App;
