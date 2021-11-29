import {
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  UnorderedList,
} from "@chakra-ui/react";

const PaymentMethodStepsTabs = ({ tabsData }) => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList>
        {tabsData?.map((data, index) => (
          <Tab key={index}>{data.title}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabsData?.map((data, index) => (
          <TabPanel p={4} key={index}>
            <UnorderedList>
              {data.steps.map((step, index) => (
                <ListItem key={index}>{step}</ListItem>
              ))}
            </UnorderedList>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default PaymentMethodStepsTabs;
