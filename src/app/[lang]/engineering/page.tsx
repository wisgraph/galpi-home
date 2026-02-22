export const runtime = 'edge';
import React from 'react';
import EngineeringClient from './EngineeringClient';
import { Metadata } from 'next';
import { getTranslation } from '@/locales/server';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const t = (path: string) => getTranslation(lang, path);

    return {
        title: `${t('navbar.items.engineering')} | ${t('metadata.title')}`,
        description: t('engineeringPage.hero.description').replace(/<[^>]*>/g, ''),
    };
}

export default function Page() {
    return <EngineeringClient />;
}
