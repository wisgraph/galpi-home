export const runtime = 'edge';
import React from 'react';
import FAQClient from './FAQClient';
import { Metadata } from 'next';
import { getTranslation } from '@/locales/server';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const t = (path: string) => getTranslation(lang, path);

    return {
        title: `${t('navbar.items.faq')} | ${t('metadata.title')}`,
        description: t('faqPage.hero.description').replace(/<[^>]*>/g, ''),
    };
}

export default function Page() {
    return <FAQClient />;
}
