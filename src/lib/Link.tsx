import React, {useContext} from 'react';
import {I18nextContext} from './i18nextContext';
import {Link as GatsbyLink, GatsbyLinkProps} from 'gatsby';
import {LANGUAGE_KEY} from './const';

type Props = GatsbyLinkProps<any> & {language?: string};

export const Link: React.FC<Props> = ({language, to, onClick, ...rest}) => {
  const context = useContext(I18nextContext);
  const urlLanguage = language || context.language;
  const link = context.routed || language ? `/${urlLanguage}${to}` : `${to}`;

  return (
    // @ts-ignore
    <GatsbyLink
      {...rest}
      to={link}
      hrefLang={urlLanguage}
      onClick={(e) => {
        if (language) {
          localStorage.setItem(LANGUAGE_KEY, language);
        }
        if (onClick) {
          onClick(e);
        }
      }}
    />
  );
};
