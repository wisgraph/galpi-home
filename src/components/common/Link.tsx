'use client';

import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useTranslation } from '@/locales/i18n';

interface LinkProps extends NextLinkProps {
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
        <NextLink href={localizedHref} {...props}>
            {children}
        </NextLink>
    );
};

export default Link;
