import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import composeEnhancers from './composeEnhancers';

export default createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));
