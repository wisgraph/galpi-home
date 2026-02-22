import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = '갈피(galpi) - 지적 생산을 위한 0.1초의 순간이동',
    description = '파일, 웹페이지, 노트를 0.5초 만에 소환하는 macOS 생산성 도구 갈피. Rust 기반의 네이티브 성능과 투명한 데이터 소유권으로 당신의 사고 흐름을 지키세요.',
    canonical = 'https://galpi.wisgraph.com/',
    ogImage = 'https://galpi.wisgraph.com/assets/images/galpi_logo.webp',
    ogType = 'website',
    keywords = '생단성 도구, macOS, 런처, 파일 검색, 지식 관리, PKM, 갈피, galpi, hooklink'
}) => {
    const siteTitle = title.includes('갈피') ? title : `${title} | 갈피(galpi)`;

    // Client-side fallback to ensure tab title updates immediately during SPA navigation
    React.useEffect(() => {
        if (typeof document !== 'undefined') {
            document.title = siteTitle;
        }
    }, [siteTitle]);

    return (
        <Helmet>
            {/* 기본 메타 태그 */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={canonical} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Structured Data (JSON-LD) - SoftwareApplication */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "갈피 (galpi)",
                    "operatingSystem": "macOS",
                    "applicationCategory": "ProductivityApplication",
                    "offers": {
                        "@type": "Offer",
                        "price": "4.99",
                        "priceCurrency": "USD"
                    },
                    "description": description,
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "5.0",
                        "reviewCount": "100"
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
