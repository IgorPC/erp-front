import React, { ReactNode } from 'react';

interface Menu {
    name: string,
    path: string
}

interface DesktopMenuItemProps {
    name: string,
    redirectTo: Function,
    icon: ReactNode,
    menus: Menu[]
}

export default DesktopMenuItemProps