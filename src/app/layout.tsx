import React from 'react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // This is a minimal root layout. 
    // The actual HTML/Body tags are in [lang]/layout.tsx to support dynamic lang attributes.
    return children;
}
