const fetchApiUrl =
  process.env.NODE_ENV === 'production' ? 'https://nfq-backend.herokuapp.com' : 'http://localhost:5000';

const reqOptions = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
};

export const addNewCostumer = async (newCostumer) => {
  try {
    const res = await fetch(`${fetchApiUrl}/addNewCostumer`, {
      method: 'POST',
      body: JSON.stringify(newCostumer),
      ...reqOptions,
    });
    await res.json();
  } catch (err) {
    console.log('Error occured: ', err);
  }
};

export const getCostumers = async () => {
  try {
    const res = await fetch(`${fetchApiUrl}/allCostumers`, reqOptions);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('Get all users error: ', err);
  }
};

export const cancelCostumerVisit = async (id) => {
  try {
    const res = await fetch(`${fetchApiUrl}/delete/${id}`, {
      method: 'DELETE',
      ...reqOptions,
    });
    await res.json();
  } catch (err) {
    console.log('Delete user failed.. ', err);
  }
};

export const editCostumerStatus = async (id, newBody) => {
  const res = await fetch(`${fetchApiUrl}/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newBody),
    ...reqOptions,
  });
  await res.json();
};
