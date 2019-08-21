import React from 'react';
import { Box, Color } from 'ink';
import axios from 'axios';
import SelectInput from 'ink-select-input';

import Layout from '../components/Layout';
import { CONFIG } from '../config';

const Complete = () => {
  const [items, setItems] = React.useState(null);
  const [completed, setCompleted] = React.useState(false);

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchResult = await axios.get(
          `${CONFIG.SERVER_ENDPOINT}/allOpenTodos`
        );
        const result = [];
        fetchResult.data.forEach(item => {
          result.push({ label: item.name, value: item.id });
        });
        setItems(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  const handleSelect = async selectedItem => {
    try {
      await axios.put(
        `${CONFIG.SERVER_ENDPOINT}/complete/${selectedItem.value}`
      );
      setCompleted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Box>Select item to mark it complete</Box>
      {items && <SelectInput items={items} onSelect={handleSelect} />}
      {completed && <Color green>Completed a tado item successfully!</Color>}
    </Layout>
  );
};

export default Complete;
