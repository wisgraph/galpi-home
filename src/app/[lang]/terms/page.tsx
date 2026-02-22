export const runtime = 'edge';
import React from 'react';
import TermsClient from './TermsClient';
import { Metadata } from 'next';
import { getTranslation } from '@/locales/server';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const t = (path: string) => getTranslation(lang, path);

    return {
        title: `${t('footer.links.terms')} | ${t('metadata.title')}`,
        description: t('metadata.description'),
    };
}

export default function Page() {
    return <TermsClient />;
}
