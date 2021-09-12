export const initialState = {
  admin: {
    islogin: false,
    details: {
      name: '',
    },
  },
  allData: [],
  DashboardData: {
    totalrequest: 0,
    totaladmin: 0,
    acceptedreq: 0,
    datedata: {},
    statedata: {},
    stagedata: {},
    mapdata: [],
  },
  dashboardContentdata: {
    Name: '--',
    District: '--',
    State: '--',
    Pincode: '--',
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE-DASHBOARD':
      return { ...state, DashboardData: action.payload };
    case 'UPDATE-DASHBOARD-CONTENT-CARD':
      return { ...state, dashboardContentdata: action.payload };
    case 'LOGIN-ADMIN':
      return {
        ...state,
        admin: {
          islogin: action.payload.login,
          details: {
            name: action.payload.name,
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
