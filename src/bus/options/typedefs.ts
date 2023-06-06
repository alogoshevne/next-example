//state type____________________________________
import { IOption } from '@setup/typedefs';

export type OptionItemState = {
  isFetching: boolean;
  data: IOption[];
  next_page_url: string;
  prev_page_url: string;
  total: number;
};

export type OptionsState = Record<string, OptionItemState>;

//payload types_________________________________
// INJECT

//common types__________________________________
