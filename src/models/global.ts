import { EffectsCommandMap } from 'dva';

export default {
  state: {
    lang: 'zh',
  },
  reducers: {
    updateLang(state: any, { payload: lang }: any) {
      return {
        ...state,
        lang,
      };
    },
  },
  effects: {
    *changeLang(_: null, { put, select }: EffectsCommandMap): IterableIterator<void> {
      const langList = ['zh', 'en'];
      const current = yield select(({ global: { lang } }: any) => lang);
      const newIdx = +!langList.indexOf(current);
      yield put({ type: 'updateLang', payload: langList[newIdx] });
    },
  },
};

export type TGlobal = {
  lang: 'zh' | 'en';
};
