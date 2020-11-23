import {InitOptions} from 'i18next';
export declare const LANGUAGE_KEY = 'gatsby-i18next-language';
export declare type PageOptions = {
  matchPath: string;
  getLanguageFromPath?: boolean;
  excludeLanguages?: string[];
  languages?: string[];
};
export declare type PluginOptions = {
  languages: string[];
  defaultLanguage: string;
  path: string;
  redirect: boolean;
  siteUrl?: string;
  i18nextOptions: InitOptions;
  pages: Array<PageOptions>;
};
export declare type Resources = Record<string, Record<string, Record<string, string>>>;
export declare type I18NextContext = {
  language: string;
  routed: boolean;
  languages: string[];
  defaultLanguage: string;
  originalPath: string;
  path: string;
  siteUrl?: string;
};
export declare type PageContext = {
  path: string;
  language: string;
  i18n: I18NextContext & {
    resources: Resources;
  };
};
