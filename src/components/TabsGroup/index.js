import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Compound from '../../views/Compound'
import Tokens from '../../views/Tokens'


const TabsGroup = () => {

  return (
    <Tabs mt={30}>
      <TabList>
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