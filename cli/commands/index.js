import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'ink';
import Layout from '../components/Layout';
import { async } from 'q';
import Axios from 'axios';
import { CONFIG } from '../config';

const Tado = () => {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(`${CONFIG.SERVER_ENDPOINT}/allOpenTodos`);
      setItems(result.data);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      {items && items.map(item => <Text key={item.id}>{item.name}</Text>)}
    </Layout>
  );
};

export default Tado;
