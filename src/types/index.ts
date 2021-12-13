export interface IPark {
  name: string;
  welcome: string;
  park: {
    address: string;
    site?: string;
    email?: string;
    latitude?: string;
    longitude?: string;
  };
}

export interface IImage {
  path: string;
  order: number;
}

export interface IImageZone extends IImage {
  imagezonetranslations_set: { name: string }[];
  cover: boolean;
}

export interface IZone {
  zone: {
    id: number;
    code: string;
    latitude: string;
    longitude: string;
    initial: boolean;
    previous: number;
    next: number;
    imagezone_set: IImageZone[];
  };
  name: string;
  description: string;
  funFacts: string;
  audio: string;
}

export interface IImageLife extends IImage {
  imagelifetranslations_set: { name: string }[];
}

export enum LifeGroup {
  FAUNA,
  FLORA,
}

export interface ILife {
  id: number;
  scientific: string;
  code: string;
  location: number | null;
  group: LifeGroup;
  lifetranslations_set: {
    name: string;
    description: string;
    funFacts: string;
    habitat: string;
    audio: string;
  }[];
  imagelife_set: IImageLife[];
}

export interface ILifeZone {
  life: ILife;
  probability: number;
  poof: number;
}
