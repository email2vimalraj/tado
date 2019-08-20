import React from 'react';
import { Box, AppContext, StdinContext, Color, Text } from 'ink';
import AddItem from './AddItem';
import ListItems from './ListItems';
import CompleteItem from './CompleteItem';

function AppWithExit(props) {
  const { stdin, onExit, ...rest } = props;

  React.useEffect(() => {
    function handleKeyPress(ch, key) {
      if ('q' === ch) {
        onExit();
      }
    }

    stdin.on('keypress', handleKeyPress);

    return function cleanup() {
      stdin.removeListener('keypress', handleKeyPress);
    };
  }, []);

  return (
    <Box flexDirection="column">
      <Text italic>
        <Color gray>Press "CTRL+c" to quit.</Color>
      </Text>

      {rest.args.add && <AddItem {...rest} />}
      {rest.args.list && <ListItems {...rest} />}
      {rest.args.complete && <CompleteItem {...rest} />}
    </Box>
  );
}

function App(props) {
  return (
    <AppContext.Consumer>
      {({ exit }) => (
        <StdinContext.Consumer>
          {({ stdin }) => (
            <AppWithExit stdin={stdin} onExit={exit} {...props} />
          )}
        </StdinContext.Consumer>
      )}
    </AppContext.Consumer>
  );
}

export default App;
