import { Component, FunctionComponent } from 'react'
import { connect } from 'dva';

export default function inject(namespace: string) {
  const mapStateToProps = (state: any) => {
    let store = state

    if (namespace in state) {
      store = {
        [namespace]: state[namespace],
        ...state
      }
    }

    return store
  }

  return <T>(Component: Component<T> | FunctionComponent<T>) => {
    return connect(mapStateToProps)(Component)
  }
}
