import React from 'react';
import { TranslationProvider } from '@/locales/i18n';
import { ThemeProvider } from '@/contexts/ThemeContext';
// import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';
import "../globals.css";

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'ko' }, { lang: 'jp' }];
}

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const initialLocale = lang as 'en' | 'ko' | 'jp';

    const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

    return (
        <html lang={initialLocale} className="dark" suppressHydrationWarning style={{ colorScheme: 'dark' }}>
            <head>
                {/* Google Analytics */}
                {gaId && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                            strategy="afterInteractive"
                        />
                        <Script id="google-analytics" strategy="afterInteractive">
                            {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${gaId}');
                            `}
                        </Script>
                    </>
                )}

                {/* Microsoft Clarity */}
                {clarityId && (
                    <Script id="microsoft-clarity" strategy="afterInteractive">
                        {`
                            (function(c,l,a,r,i,t,y){
                                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                            })(window, document, "clarity", "script", "${clarityId}");
                        `}
                    </Script>
                )}
                {/* Force Dark Mode Load */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function() { 
                            document.documentElement.classList.add('dark');
                            document.documentElement.style.colorScheme = 'dark';
                        })()`,
                    }}
                />
            </head>
            <body>
                <TranslationProvider initialLocale={initialLocale}>
                    <ThemeProvider>
                        {/* <AnalyticsProvider> */}
                        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-violet-500 selection:text-white font-sans transition-colors duration-300">
                            <Navbar />
                            <main>{children}</main>
                            <Footer />
                        </div>
                        {/* </AnalyticsProvider> */}
                    </ThemeProvider>
                </TranslationProvider>
            </body>
        </html>
    );
}
