import React from 'react';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';

function CompleteItem() {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchResult = await fetch('http://localhost:3000/allOpenTodos');
        const resultJSON = await fetchResult.json();

        const result = [];
        resultJSON.forEach(doc =>
          result.push({ label: doc.name, value: doc.id })
        );
        setItems(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  const handleSelect = async item => {
    try {
      await fetch(`http://localhost:3000/complete/${item.value}`, {
        method: 'PUT',
      });
      console.log(`${item.label} is marked completed`);
    } catch (err) {
      console.error(err);
    }
    process.exit(1);
  };

  return (
    <>
      <Box>
        <Text>Select to mark it complete?</Text>
      </Box>
      {items && <SelectInput items={items} onSelect={handleSelect} />}
    </>
  );
}

export default CompleteItem;
