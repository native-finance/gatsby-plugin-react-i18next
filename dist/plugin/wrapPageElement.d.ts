/// <reference types="react" />
import {WrapPageElementBrowserArgs} from 'gatsby';
import {PageContext, PluginOptions} from '../types';
export declare const wrapPageElement: (
  {element, props}: WrapPageElementBrowserArgs<any, PageContext>,
  {i18nextOptions, redirect, siteUrl}: PluginOptions
) => JSX.Element | null | undefined;
