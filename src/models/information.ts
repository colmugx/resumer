export default {
  state: {
    profile: {
    },
    others: {
    },
  },
  reducers: {
    update(state: any, { type, data }: any) {
      return {
        ...state,
        [type]: data,
      };
    },
  },
  effects: {},
};
