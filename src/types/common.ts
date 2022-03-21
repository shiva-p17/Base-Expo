export type ParseResponse = {
  result: object;
};

export type ParseFile = {
  __type: 'Image' | 'File';
  name: string;
  url: string;
};

export type Pointer = {
  __type: 'Pointer';
  className: string;
  objectId: string;
};

export type ACL = {
  [key: string]: {
    read: boolean;
    write: boolean;
  };
};

export type Date = {
  __type: 'Date';
  iso: string;
};

export type ParseObject = {
  __type: 'Pointer';
  className: string;
  id: string;
};
