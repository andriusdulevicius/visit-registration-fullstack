const fetchApiUrl =
  process.env.NODE_ENV === 'production' ? 'https://nfq-task-react-express.herokuapp.com' : 'http://localhost:5000';

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

export const addNewVisitor = async (newVisitor) => {
  try {
    // const data = await fetch(`${fetchApiUrl}/allConsultants`, reqOptions);
    // const consultants = await data.json();
    // const loggedInConsultants = consultants.filter((c) => c.isLoggedIn);
    // const leastBusyConsultant = loggedInConsultants.sort((a, b) => (a.visits.length < b.visits.length ? 1 : -1))[0];
    // console.log(leastBusyConsultant);

    const res = await fetch(`${fetchApiUrl}/visitor`, {
      method: 'POST',
      body: JSON.stringify(newVisitor),
      ...reqOptions,
    });
    return await res.json();
  } catch (err) {
    console.log('Error occured: ', err);
  }
};

export const getVisitor = async (reference) => {
  try {
    const res = await fetch(`${fetchApiUrl}/visitor?reference=${reference}`, reqOptions);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('Get all visits error: ', err);
  }
};

export const cancelVisitor = async (reference) => {
  try {
    await fetch(`${fetchApiUrl}/visitor?reference=${reference}`, {
      method: 'DELETE',
      ...reqOptions,
    });
  } catch (err) {
    console.log('Delete user failed.. ', err);
  }
};

export const editVisitorStatus = async (reference, newBody) => {
  try {
    const res = await fetch(`${fetchApiUrl}/visitor?reference=${reference}`, {
      method: 'PUT',
      body: JSON.stringify(newBody),
      ...reqOptions,
    });
    await res.json();
  } catch (err) {
    console.log('An error trying to edit visit', err);
  }
};

export const getConsultant = async (email) => {
  try {
    const res = await fetch(`${fetchApiUrl}/consultant?email=${email}`);
    return await res.json();
  } catch (err) {
    console.log('An error trying to validate consultant', err);
  }
};

export const login = async (email, password, isLoggedIn) => {
  try {
    const res = await fetch(`${fetchApiUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password, isLoggedIn }),
      ...reqOptions,
    });

    return await res.json();
  } catch (err) {
    console.log('An error trying to validate consultant', err);
  }
};
