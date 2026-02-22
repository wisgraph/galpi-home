import React from 'react';
import AboutClient from './AboutClient';
import { Metadata } from 'next';
import { getTranslation } from '@/locales/server';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const t = (path: string) => getTranslation(lang, path);

    return {
        title: `${t('navbar.items.about')} | ${t('metadata.title')}`,
        description: t('aboutPage.hero.description').replace(/<[^>]*>/g, ''),
    };
}

export default function Page() {
    return <AboutClient />;
}
