import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/auth';
import userReducer from './auth/user';
import loadingReducer from './loading';
import mindmapReducer from './mindmaps/mindmap';

// 리덕스 상태 지속 설정
const persistConfig = {
  key: 'root', // 지속되어야 하는 상태의 최상위 키입니다. 이 경우 '루트'는 전체 상태가 지속됨을 의미합니다.
  storage: storage, // 어떤 종류의 스토리지가 사용되는지 나타내며 사용 가능한 많은 옵션이 있습니다.
  // blacklist: [''], // 블랙리스트에 키를 추가하기만 하면 상태의 유지 하위 트리를 건너뛰도록 선택할 수 있습니다. 이 경우 추가 항목을 저장하지 않도록 선택합니다. 즉, 초기 상태가 항상 다시 시작됩니다. 화이트리스트 기능도 사용할 수 있습니다.
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  loading: loadingReducer,
  mindmap: mindmapReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// redux 상태 지속을 위한 리듀서
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
