import { createSlice } from '@reduxjs/toolkit';
import type { Profile } from '../../app/types/typesProfile';

interface ProfileState {
  profile?: Profile;
}

const initialState: ProfileState = {
  profile: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = undefined;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
