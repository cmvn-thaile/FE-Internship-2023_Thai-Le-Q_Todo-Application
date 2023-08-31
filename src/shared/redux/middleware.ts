export const loggerMiddleware = (storeApi:any) => (next:any) => (action:any) => {
  console.log('Dispatching', action);
  console.log('Current state', storeApi.getState());
  next(action);
  console.log('Next state', storeApi.getState());
};
