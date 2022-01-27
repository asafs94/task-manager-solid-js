import type { JSXElement, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cx } from '~/utils';
import { Text } from '..';
import styles from './Button.module.scss';

interface IProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'contained' | 'simple' | 'highlight';
    size?: 'body' | 'small';
};

export function Button(props: IProps) {
    const [local, rest] = splitProps(props, ['variant', 'class', 'children', 'size']);
    return (
        <button class={cx(styles[local.variant ?? 'simple'],local.class)} {...rest}>
            <Text as="div" color='inherit' variant={`${local.size ?? 'body'}-1`}>
                {local.children}
            </Text>
        </button>
    )
};
