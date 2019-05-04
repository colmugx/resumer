export default {
  state: {
    profile: {},
    others: {},
  },
  reducers: {
    update(state: any, { payload: { type, data } }: any) {
      return {
        ...state,
        [type]: data,
      };
    },
  },
  effects: {
    *updateProfile({ payload }: any, { put }: any) {
      yield put({
        type: 'update',
        payload: {
          type: 'profile',
          data: payload,
        },
      });
    },
    *updateOthers({ payload }: any, { put }: any) {
      yield put({
        type: 'update',
        payload: {
          type: 'others',
          data: payload,
        },
      });
    },
  },
};
