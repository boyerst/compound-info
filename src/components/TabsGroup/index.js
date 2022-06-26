import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Image } from '@chakra-ui/react'
import Logo from '../../assets/compound.png';
import Compound from '../../views/Compound'
import Tokens from '../../views/Tokens'
import Liquidations from '../../views/Liquidations'
import Whales from '../../views/Whales'



const TabsGroup = () => {

  return (
    <Tabs mt={30}>
      <TabList>
        <Image src={Logo} htmlHeight='50' htmlWidth='50' mx={3} mb={2} mr={4} pointerEvents="none" />
        <Tab fontWeight='bold'>One</Tab>
        <Tab fontWeight='bold'>Tokens</Tab>
        <Tab fontWeight='bold'>Liquidations</Tab>
        <Tab fontWeight='bold'>Whales</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
          <Compound />
        </TabPanel>
        <TabPanel>
          <Tokens />
        </TabPanel>
        <TabPanel>
          <Liquidations />
        </TabPanel>
        <TabPanel>
          <Whales />
        </TabPanel>
      </TabPanels>
    </Tabs>      
  )
}

export default TabsGroup