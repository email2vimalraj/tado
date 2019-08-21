import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { Color } from 'ink';
import Spinner from 'ink-spinner';

import { CONFIG } from '../config';
import Layout from '../components/Layout';

const Add = ({ inputArgs }) => {
  const [loading, setLoading] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  React.useEffect(() => {
    const addItem = async () => {
      try {
        await Axios.post(`${CONFIG.SERVER_ENDPOINT}/addtodo`, {
          name: inputArgs[1],
        });
      } catch (error) {
        console.error(error);
      }
    };

    setLoading(true);
    addItem();
    setLoading(false);
    setAdded(true);
  }, []);

  return (
    <Layout>
      {loading && (
        <Color green>
          <Spinner type="dots" />
        </Color>
      )}
      {added && <Color green>Added the item successfully!</Color>}
    </Layout>
  );
};

Add.propTypes = {
  inputArgs: PropTypes.array,
};

export default Add;
