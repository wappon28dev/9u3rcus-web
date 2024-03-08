export type ENV = {
  MAIL_DKIM_PRIVATE_KEY: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type Variables = {};

export type HonoType = { Bindings: ENV; Variables: Variables };
