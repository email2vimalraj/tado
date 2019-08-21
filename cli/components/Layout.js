import React from 'react';
import { Box, Text } from 'ink';

const Layout = ({ children }) => (
  <>
    <Box>
      <Text italic bold>
        Tado!
      </Text>
    </Box>
    <Box flexDirection="column">{children}</Box>
  </>
);

export default Layout;
