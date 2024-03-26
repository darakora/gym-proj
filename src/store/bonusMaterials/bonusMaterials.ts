import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type BonusMaterials } from '~/entities/apiTypes';

interface BonusMaterialsState {
  data: BonusMaterials | null;
}

const initialState: BonusMaterialsState = {
  data: null
};

export const bonusMaterialsSlice = createSlice({
  name: 'bonusMaterials',
  initialState,
  reducers: {
    setBonusMaterials: (state, action: PayloadAction<BonusMaterials>) => {
      state.data = action.payload;
    }
  }
});

export const { setBonusMaterials } = bonusMaterialsSlice.actions;
