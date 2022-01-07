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

const errorList = {
  getVisitor: 'get visitor',
  addNewVisitor: 'add new visitor',
  editVisitorStatus: 'edit visitor',
  cancelVisitor: 'cancel visitor',
  getConsultant: 'get consultant',
  editConsultantStatus: 'edit consultant',
  getActiveConsultantsCount: 'get all available consultants',
  login: 'login authentication',
};

export const getVisitor = async (reference) => {
  try {
    const res = await fetch(`${fetchApiUrl}/visitor?reference=${reference}`, reqOptions);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(`${errorList.getVisitor}: ${err}`);
  }
};

export const addNewVisitor = async (newVisitor) => {
  try {
    const res = await fetch(`${fetchApiUrl}/visitor`, {
      method: 'POST',
      body: JSON.stringify(newVisitor),
      ...reqOptions,
    });
    return await res.json();
  } catch (err) {
    console.log(`${errorList.addNewVisitor}: ${err}`);
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
    console.log(`${errorList.editVisitorStatus}: ${err}`);
  }
};

export const cancelVisitor = async (reference) => {
  try {
    await fetch(`${fetchApiUrl}/visitor?reference=${reference}`, {
      method: 'DELETE',
      ...reqOptions,
    });
  } catch (err) {
    console.log(`${errorList.cancelVisitor}: ${err}`);
  }
};

export const getConsultant = async (email) => {
  try {
    const res = await fetch(`${fetchApiUrl}/consultant?email=${email}`);
    return await res.json();
  } catch (err) {
    console.log(`${errorList.getConsultant}: ${err}`);
  }
};

export const editConsultantStatus = async (email, isActive) => {
  try {
    const res = await fetch(`${fetchApiUrl}/consultant`, {
      method: 'PUT',
      body: JSON.stringify({ email, isActive }),
      ...reqOptions,
    });

    return await res.json();
  } catch (err) {
    console.log(`${errorList.editConsultantStatus}: ${err}`);
  }
};

export const getActiveConsultantsCount = async () => {
  try {
    const res = await fetch(`${fetchApiUrl}/activeConsultantsCount`);

    return await res.json();
  } catch (err) {
    console.log(`${errorList.getActiveConsultantsCount}: ${err}`);
  }
};

export const login = async (email, password) => {
  try {
    const res = await fetch(`${fetchApiUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      ...reqOptions,
    });

    return await res.json();
  } catch (err) {
    console.log(`${errorList.login}: ${err}`);
  }
};
