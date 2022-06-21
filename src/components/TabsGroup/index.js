import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Image } from '@chakra-ui/react'
import Logo from '../../assets/compound.png';
import Compound from '../../views/Compound'
import Tokens from '../../views/Tokens'


const TabsGroup = () => {

  return (
    <Tabs mt={30}>
      <TabList>
        <Image src={Logo} htmlHeight='50' htmlWidth='50' mx={3} mb={2} mr={4} pointerEvents="none" />
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
          <Compound />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
          <Tokens />
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>      
  )
}

export default TabsGroup