export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  mainTag: string;
  liveDemo?: string;
  code?: string;
  underConstruction?: boolean;
  privateCode?: boolean;
  note?: string;
  loginInstructions?: string;
  isPrivate?: boolean;
}
