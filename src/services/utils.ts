export type Override<What, With> = Omit<What, keyof With> & With;
