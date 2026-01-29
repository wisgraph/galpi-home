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
    { id: 'search-engine', title: '가장 이기적인 한국어 검색', highlight: true, separator: true },

    { id: 'typed-tags', title: '태그 관리: 노동의 종말', highlight: true },
    { id: 'tag-autocomplete', title: '신경망 자동완성' },
    { id: 'context-tags', title: '필터링을 안 하는 이유' },
    { id: 'auto-context-search', title: '마우스 없는 세상', highlight: true, separator: true },

    { id: 'data-sync', title: '투명한 데이터 금고' },
    { id: 'unbroken-links', title: '끊어지지 않는 연결' },
    { id: 'smart-ranking', title: '엔터를 치기도 전에' },
];
