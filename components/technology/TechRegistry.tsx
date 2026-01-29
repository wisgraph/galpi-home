import React from 'react';
import AutoContextSearch from './features/AutoContextSearch';
import SearchEngine from './features/SearchEngine';
import ContextTags from './features/ContextTags';
import UnbrokenLinks from './features/UnbrokenLinks';
import SmartRanking from './features/SmartRanking';
import DataSync from './features/DataSync';
import TagAutocomplete from './features/TagAutocomplete';
import TypedTags from './features/TypedTags';
import KnowledgeWorkflow from './features/KnowledgeWorkflow';

// Feature Registry
export const FeatureRegistry: Record<string, React.FC> = {
    'search-engine': SearchEngine,
    'typed-tags': TypedTags,
    'tag-autocomplete': TagAutocomplete,
    'context-tags': ContextTags,
    'auto-context-search': AutoContextSearch,
    'data-sync': DataSync,
    'unbroken-links': UnbrokenLinks,
    'smart-ranking': SmartRanking,
    // Legacy support or redirects if needed, though usually strict ID match
};

export const FeatureList = [
    { id: 'search-engine', title: '한국인을 위한 진짜 검색', highlight: true, separator: true },
    { id: 'typed-tags', title: '태그 관리의 자동화', highlight: true },
    { id: 'tag-autocomplete', title: '신경망 자동완성' },
    { id: 'context-tags', title: '컨텍스트 태그' },
    { id: 'auto-context-search', title: '마우스 없는 세상', highlight: true, separator: true },
    { id: 'data-sync', title: '절대적인 데이터 주권' },
    { id: 'unbroken-links', title: '절대 끊어지지 않는 연결' },
    { id: 'smart-ranking', title: '지능형 검색 서열' },
];
