import { createSlice } from '@reduxjs/toolkit';

export interface SideBarState {
  isClicked: boolean;
}

const initialState: SideBarState = {
  isClicked: false
};

export const sideBarClickSlice = createSlice({
  name: 'toggleSideBar',
  initialState,
  reducers: {
    toggleBoolean: (state) => {
      state.isClicked = !state.isClicked;
    }
  }
});

export const { toggleBoolean } = sideBarClickSlice.actions;
