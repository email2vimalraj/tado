import React from 'react';
import { Box, Text, Color } from 'ink';

function ListItems() {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchResult = await fetch('http://localhost:3000/allOpenTodos');
        const result = await fetchResult.json();
        setItems(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  return (
    <Box flexDirection="column">
      {items && (
        <>
          {items.map(item => (
            <Box flexDirection="column" key={item.id}>
              <Text>&gt; {item.name}</Text>
            </Box>
          ))}
          <Text italic>
            <Color gray>{items.length} Items</Color>
          </Text>
        </>
      )}
    </Box>
  );
}

export default ListItems;
