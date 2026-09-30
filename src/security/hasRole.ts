import { RootState } from "../store.ts";

export const selectIsActive = (state: RootState) => state.session.active;
export const selectRoles = (state: RootState) => state.session.roles;

export const hasRole = (state: RootState, role: string) =>
  state.session.roles.includes(role);
