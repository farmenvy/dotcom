import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// import any new reducers here and add to
// rooReducer below.
import { reducer as auth } from './auth';
import { reducer as signup } from './signup';
import { reducer as user } from './user';
import { reducer as manageCSA } from './manageCSA';
import { reducer as CSAbasics } from './CSAbasics';
import { reducer as CSApickups } from './CSApickups';
import { reducer as modal } from './modal';

const rootReducer = combineReducers({
  auth,
  signup,
  user,
  manageCSA,
  CSAbasics,
  CSApickups,
  modal,
});


const middleware = [thunk];

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middleware),
));
