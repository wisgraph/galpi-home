import React from 'react';
import PricingClient from './PricingClient';
import { Metadata } from 'next';
import { getTranslation } from '@/locales/server';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const t = (path: string) => getTranslation(lang, path);

    return {
        title: `${t('navbar.items.pricing')} | ${t('metadata.title')}`,
        description: t('pricing.subtitle'),
    };
}

export default function Page() {
    return <PricingClient />;
}
