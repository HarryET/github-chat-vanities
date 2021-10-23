export const UserVanity = 1;
export const ChatVanity = 2;

export type Vanities = {
  id: string;
  type: number;
  registered_at: string;
  text: string;
  redirect_to: string;
};

export type SupabaseTables = "vanities";
