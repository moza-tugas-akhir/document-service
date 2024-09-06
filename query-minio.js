import axios from 'axios';

// Used for testing purposes

export async function queryByUserIdFromMinio(userId, token) {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios.get(
      // user Id hardcoded
      `${process.env.MINIO_URL}/api/querydocbyuserid/${userId}`,
      // formData,
      {
        // headers: {
        //   // provide bearer token taken from Bruno
        //   Authorization:
        //     'Bearer ' +
        //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTJhNjY1MjkiLCJlbWFpbCI6Im5ld3VzZXJAZ21haWwuY29tIiwiaWF0IjoxNzIzMTk3ODA3fQ.AImr-e2aobNr4I1mK6cOz7vowMiFey2NggTqDzMdrOQ',
        // },
        headers,
        timeout: 10000,
      }
    );

    // console.log('File queried successfully');
    return response.data;
  } catch (err) {
    console.error(`Error querying file: ${err.message}`);
    // if (err.response) {
    //   console.error(err.response.data);
    console.error(err.response.status);
    //   console.error(err.response.headers);
    // } else if (err.request) {
    //   console.error(err.request);
    // }
    // throw err;
  }
}

export async function queryByDocIdFromMinio(docId, token = null) {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios.get(
      // doc Id hardcoded
      `${process.env.MINIO_URL}/api/querydocbydocid/${docId}`,
      // formData,
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
    //   console.error(err.response.data);
    console.error(err.response.status);
    //   console.error(err.response.headers);
    // } else if (err.request) {
    //   console.error(err.request);
    // }
    // throw err;
  }
}
