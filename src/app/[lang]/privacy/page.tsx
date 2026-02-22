import React from 'react';
import PrivacyClient from './PrivacyClient';
import { Metadata } from 'next';
import { getTranslation } from '@/locales/server';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const t = (path: string) => getTranslation(lang, path);

    return {
        title: `${t('footer.links.privacy')} | ${t('metadata.title')}`,
        description: t('metadata.description'),
    };
}

export default function Page() {
    return <PrivacyClient />;
}
