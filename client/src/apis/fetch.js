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

export const addNewVisit = async (newVisit) => {
  try {
    // const data = await fetch(`${fetchApiUrl}/allConsultants`, reqOptions);
    // const consultants = await data.json();
    // const loggedInConsultants = consultants.filter((c) => c.isLoggedIn);
    // const leastBusyConsultant = loggedInConsultants.sort((a, b) => (a.visits.length < b.visits.length ? 1 : -1))[0];
    // console.log(leastBusyConsultant);

    const res = await fetch(`${fetchApiUrl}/addNewVisit`, {
      method: 'POST',
      body: JSON.stringify(newVisit),
      ...reqOptions,
    });
    await res.json();
  } catch (err) {
    console.log('Error occured: ', err);
  }
};

export const getVisits = async () => {
  try {
    const res = await fetch(`${fetchApiUrl}/allVisits`, reqOptions);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('Get all visits error: ', err);
  }
};

export const cancelVisit = async (id) => {
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

export const editVisitStatus = async (id, newBody) => {
  try {
    const res = await fetch(`${fetchApiUrl}/edit/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newBody),
      ...reqOptions,
    });
    await res.json();
  } catch (err) {
    console.log('An error trying to edit visit', err);
  }
};

export const getConsultant = async (email, password, isLoggedIn) => {
  try {
    const res = await fetch(`${fetchApiUrl}/consultant`, {
      method: 'POST',
      body: JSON.stringify({ email, password, isLoggedIn }),
      ...reqOptions,
    });
    console.log(res);

    return await res.json();
  } catch (err) {
    console.log('An error trying to get consultant', err);
  }
};
