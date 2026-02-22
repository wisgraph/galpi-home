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
    { id: 'search-engine', highlight: true, separator: true },

    { id: 'typed-tags', highlight: true },
    { id: 'tag-autocomplete' },
    { id: 'context-tags' },
    { id: 'auto-context-search', highlight: true, separator: true },

    { id: 'data-sync' },
    { id: 'unbroken-links' },
    { id: 'smart-ranking' },
];
