import type { JSXElement, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cx } from '~/utils';
import styles from './IconButton.module.scss';

interface IProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: 'contained' | 'simple' | 'highlight';
};

export function IconButton(props: IProps) {
    const [local, rest] = splitProps(props, ['class', 'children', 'variant'])
    return (
        <button class={cx(styles[local.variant ?? 'simple'], local.class)} {...rest}>
            {local.children}
        </button>
    )
};
