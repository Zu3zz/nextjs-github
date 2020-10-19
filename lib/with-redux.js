/**
 * @author 3zz.
 * @data 2020/10/19
 */
import React from 'react';
import createStore from '../store';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialStore) {
  if (isServer) {
    return createStore(initialStore);
  }
  
  if (!window[__NEXT_REDUX_STORE__]) window[__NEXT_REDUX_STORE__] = createStore(initialStore);
  
  return window[__NEXT_REDUX_STORE__];
}

export default Comp => {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props);
      
      this.reduxStore = getOrCreateStore(props.initialReduxStore);
    }
    
    static async getInitialProps(ctx) {
      let reduxStore;
      const {req} = ctx.ctx;
      
      if (isServer && req.session && req.session.userInfo) {
        const session = req.session;
        reduxStore = getOrCreateStore({
          user: session.userInfo,
        });
      } else reduxStore = getOrCreateStore();
      
      ctx.reduxStore = reduxStore;
      
      let appProps = {};
      if (typeof Comp.getInitialProps === 'function') {
        appProps = await Comp.getInitialProps(ctx);
      }
      
      return {
        ...appProps,
        initialReduxStore: reduxStore.getState(),
      };
    }
    
    render() {
      const {Component, pageProps, ...rest} = this.props;
      
      return (<Comp
        Component={Component}
        pageProps={pageProps}
        {...rest}
        reduxStore={this.reduxStore}
      />)
    }
  }
  
  return WithReduxApp;
}
