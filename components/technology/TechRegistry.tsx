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
    { id: 'search-engine', title: '고성능 검색 엔진', highlight: true, separator: true },
    { id: 'typed-tags', title: '타입드 태그', highlight: true },
    { id: 'tag-autocomplete', title: '지능형 자동완성' },
    { id: 'context-tags', title: '컨텍스트 태그' },
    { id: 'auto-context-search', title: '자동 맥락 감지', highlight: true, separator: true },
    { id: 'data-sync', title: '데이터 소유권' },
    { id: 'unbroken-links', title: '완전 추적 시스템' },
    { id: 'smart-ranking', title: '스마트 에이징 및 랭킹' },
];
