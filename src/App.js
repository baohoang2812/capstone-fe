import "./styles/index.less";

import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import axios from "axios";

/* Redux - Sagas */
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import { all } from "@redux-saga/core/effects";

/* Core */
import Layout from "~/Core/Components/Layout";
import initRedux from "~/Core/Store/initRedux";
import initSagas from "~/Core/Store/initSagas";
import { initApp } from "~/Core/Providers/AppProvider";
import InitProvider from "~/Core/Providers/InitProvider";

/* Languague */
import intlMessagesEn from "~/Core/i18n/localization/en.json";
import intlMessagesVi from "~/Core/i18n/localization/vi.json";

class App extends Component {
  state = {
    init: false,
    listRoutes: [],
    listUrl: [],
    listArrayRoutes: [],
    listRedux: initRedux,
    listSagas: initSagas,
    listLangVi: intlMessagesVi,
    listLangEn: intlMessagesEn
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const account_info = JSON.parse(localStorage.getItem("account_info"));
    let isAuthenticated = false;
    if (token !== null && token !== undefined) {
      isAuthenticated = true;
      axios.defaults.headers["token"] = token;
    }

    initApp(isAuthenticated, account_info).then(res => {
      const { resModules } = res;

      this.setState({
        init: true,
        listRoutes: Object.values({ ...resModules.listRoutes }),
        listUrl: Object.values({ ...resModules.listUrl }),
        listArrayRoutes:  [ ...this.state.listArrayRoutes, ...resModules.listArrayRoutes ],
        listRedux: { ...this.state.listRedux, ...resModules.listRedux },
        listSagas: [ ...this.state.listSagas, ...resModules.listSagas ],
        listLangVi: { ...this.state.listLangVi, ...resModules.listLangVi },
        listLangEn: { ...this.state.listLangEn, ...resModules.listLangEn }
      });
    });
  }

  render = () => {
    const { listRedux, listSagas, listRoutes, listUrl, listArrayRoutes, init } = this.state;
    let store = null;

    if (init) {
      //store redux-sagas
      const sagaMiddleware = createSagaMiddleware();
      const composeEnhancers = composeWithDevTools({
        // Specify name here, actionsBlacklist, actionsCreators and other options if needed
      });
      const rootReducer = combineReducers(listRedux);
      const rootSaga = function* () {
        yield all(listSagas);
      };
  
      const transform = createTransform((
        (inboundState, key) => {
          if (/_persist/.test(key)) {
            return inboundState;
          }
        }
      ))
  
      const persistedReducer = persistReducer({
        key: "root",
        storage,
        transforms: [transform]
      }, rootReducer)
  
      store = createStore(
        persistedReducer,
        composeEnhancers(applyMiddleware(sagaMiddleware))
      );
      const persistor = persistStore(store);
      sagaMiddleware.run(rootSaga);
  
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <InitProvider
              listUrl={this.state.listUrl}
              listLangVi={this.state.listLangVi}
              listLangEn={this.state.listLangEn}
            >
              <Layout listRoutes={listRoutes} listUrl={listUrl} listArrayRoutes={listArrayRoutes} />
            </InitProvider>
          </PersistGate>
        </Provider>
      );
    }

    return null;
  };
}

export default App;
