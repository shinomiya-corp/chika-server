type Guild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: any[];
  permissions_new: string;
};

type SimpleGuild = Pick<Guild, 'id' | 'name' | 'icon'> & { isChikaIn: boolean };

export type { Guild, SimpleGuild };
