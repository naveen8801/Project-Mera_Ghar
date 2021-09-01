export const initialState = {
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
    Name : '--',
    District : '--',
    State : '--',
    Pincode : '--'
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE-DASHBOARD':
      return { ...state, DashboardData: action.payload };
    case 'UPDATE-DASHBOARD-CONTENT-CARD' :
      return { ...state, dashboardContentdata: action.payload };
    default:
      return state;
  }
};

export default reducer;
