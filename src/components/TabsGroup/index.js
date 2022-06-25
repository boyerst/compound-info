import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Image } from '@chakra-ui/react'
import Logo from '../../assets/compound.png';
import Compound from '../../views/Compound'
import Tokens from '../../views/Tokens'
import Liquidations from '../../views/Liquidations'



const TabsGroup = () => {

  return (
    <Tabs mt={30} defaultIndex={2}>
      <TabList>
        <Image src={Logo} htmlHeight='50' htmlWidth='50' mx={3} mb={2} mr={4} pointerEvents="none" />
        <Tab>One</Tab>
        <Tab>Tokens</Tab>
        <Tab>Liquidations</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
          <Compound />
        </TabPanel>
        <TabPanel>
          <Tokens />
        </TabPanel>
        <TabPanel >
          <Liquidations />
        </TabPanel>
      </TabPanels>
    </Tabs>      
  )
}

export default TabsGroup