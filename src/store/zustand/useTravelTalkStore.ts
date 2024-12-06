import { create } from "zustand";
 
interface MenuState {
  selectBoxStates: Record<string, string>;
  setSelectBoxState: (key: string, value: string) => void;
}
 
interface CategoryMenuState {
  selectCategoryStates: string;
  setSelectCategoryState: (value: string) => void;
}
 
/** 여행토크 셀렉박스 전역상태관리 */
export const useTravelTalkStore = create<MenuState>((set) => ({
  selectBoxStates: {
    sideBarRegion: "전체",
  },
  setSelectBoxState: (key, value) =>
    set((state) => ({
      selectBoxStates: {
        ...state.selectBoxStates,
        [key]: value,
      },
    })),
}));
 
/** 여행토크 사이드바 카테고리 전역상태관리 */
export const useTravelTalkCategoryStore = create<CategoryMenuState>((set) => ({
  selectCategoryStates: "전체글",
  setSelectCategoryState: (value) =>
    set(() => ({
      selectCategoryStates: value,
    })),
}));
 