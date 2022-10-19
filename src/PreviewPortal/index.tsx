import type { PreviewerPortalProps } from '../typing';
import { createPortal } from 'react-dom'
import React,{ cloneElement } from 'react'
import type {ReactElement} from 'react';


export default function PreviewPortal(props: PreviewerPortalProps) {
    const { visible, children, ...restProps } = props;
    if (!children || !visible) return <></>
    return createPortal(cloneElement(children as ReactElement, {
        ...restProps
    }), document.body)
}