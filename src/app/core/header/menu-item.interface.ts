interface Child {
  name: string;
  path: string;
  abilityToEscape: boolean;
}

export interface MenuItem {
  name: string;
  path: string;
  abilityToEscape: boolean;
  children?: Child[];
}
