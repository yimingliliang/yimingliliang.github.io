export interface Site {
  title: string;
  url: string;
  description?: string;
  icon?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  sites: Site[];
} 