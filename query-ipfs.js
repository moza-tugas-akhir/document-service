import axios from 'axios';

// Used for testing purposes

export async function queryByUserIdFromIPFS(userId, token = null) {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios.get(
      // user Id hardcoded
      `${process.env.BLOCKCHAIN_SERVICE_URL}/api/querydocbyuserid/${userId}`,
      {
        headers,
        timeout: 10000,
      }
    );

    // console.log('File queried successfully');
    return response.data;
  } catch (err) {
    console.error(`Error querying file: ${err.message}`);
    // if (err.response) {
    //   // console.error(err.response.data);
    console.error(err.response.status);
    //   // console.error(err.response.headers);
    // } else if (err.request) {
    //   console.error(err.request);
    // }
    // throw err;
  }
}

export async function queryByDocIdFromIPFS(userId, docId, token = null) {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const response = await axios.get(
      // doc Id hardcoded
      `${process.env.BLOCKCHAIN_SERVICE_URL}/api/querydocbydocid/${userId}/${docId}`,
      {
        headers,
        timeout: 10000,
      }
    );

    // console.log('File queried successfully');
    return response.data;
  } catch (err) {
    console.error(`Error querying file: ${err.message}`);
    //   if (err.response) {
    //     // console.error(err.response.data);
    console.error(err.response.status);
    //     // console.error(err.response.headers);
    //   } else if (err.request) {
    //     console.error(err.request);
    //   }
    //   throw err;
  }
}
