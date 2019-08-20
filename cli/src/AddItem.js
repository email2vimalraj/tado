import React, { useState } from 'react';
import { Text, Box, Color } from 'ink';
import Spinner from 'ink-spinner';
import SelectInput from 'ink-select-input';

import { sleep } from './util';

function AddItem(props) {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const { args } = props;

  const optionItems = [
    {
      label: 'Yes',
      value: 'yes',
    },
    {
      label: 'No',
      value: 'no',
    },
  ];

  const handleSelect = async item => {
    if (item.value === 'yes') {
      setLoading(true);
      try {
        await fetch('http://localhost:3000/addtodo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: args.add }),
        });
        setCompleted(true);
        sleep(3000);
      } catch (error) {
        console.error(error);
      }
    }
    process.exit(1);
  };

  return (
    <>
      <Box>
        <Text>Are you sure want to add?</Text>
      </Box>
      <Box>
        <SelectInput items={optionItems} onSelect={handleSelect} />
      </Box>
      {loading && (
        <Box>
          <Color green>
            <Spinner type="dots" />
          </Color>{' '}
          Adding an item
        </Box>
      )}
      {completed && (
        <Box>
          <Color green>Added an item</Color>
        </Box>
      )}
    </>
  );
}

export default AddItem;
