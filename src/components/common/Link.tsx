

import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { useTranslation } from '@/locales/i18n';

interface LinkProps extends Omit<RouterLinkProps, 'to'> {
    href: string | { pathname: string };
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}

const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
    const { locale } = useTranslation();

    // Ensure href is a string for prefixing
    const hrefString = typeof href === 'string' ? href : (href.pathname || '');

    // Prefix with locale if it's an internal link and not already prefixed
    const isInternal = hrefString.startsWith('/');
    const isAlreadyPrefixed = hrefString.startsWith(`/${locale}/`) || hrefString === `/${locale}`;

    const localizedHref = isInternal && !isAlreadyPrefixed
        ? `/${locale}${hrefString === '/' ? '' : hrefString}`
        : href;

    return (
        <RouterLink to={localizedHref as string} {...props}>
            {children}
        </RouterLink>
    );
};

export default Link;
