import React, { ReactNode } from 'react';

interface Menu {
    name: string,
    path: string,
    icon: ReactNode
}

interface MobileMenuItemProps {
    name: string,
    redirectTo: Function,
    icon: ReactNode,
    menus: Menu[]
}

export default MobileMenuItemProps