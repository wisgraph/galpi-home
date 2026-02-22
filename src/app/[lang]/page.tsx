export const runtime = 'edge';
import React from 'react';
import HomeClient from './HomeClient';
import { Metadata } from 'next';

import { getTranslation } from '@/locales/server';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const t = (path: string) => getTranslation(lang, path);

    return {
        title: t('metadata.title'),
        description: t('metadata.description'),
        keywords: t('metadata.keywords'),
        openGraph: {
            title: t('metadata.title'),
            description: t('metadata.description'),
            images: ['https://galpi.wisgraph.com/assets/images/galpi_logo.webp'],
            type: 'website',
            url: `https://galpi.wisgraph.com/${lang}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: t('metadata.title'),
            description: t('metadata.description'),
            images: ['https://galpi.wisgraph.com/assets/images/galpi_logo.webp'],
        },
    };
}

export default function Page() {
    return <HomeClient />;
}
