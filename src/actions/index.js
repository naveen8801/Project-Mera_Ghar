export const updatedashboarddata = (data) => {
  return {
    type: 'UPDATE-DASHBOARD',
    payload: data,
  };
};

export const updatedashboardContentCard = (data) => {
  return {
    type: 'UPDATE-DASHBOARD-CONTENT-CARD',
    payload: data,
  };
};

export const loginAdmin = (data) => {
  return {
    type: 'LOGIN-ADMIN',
    payload: data,
  };
};
