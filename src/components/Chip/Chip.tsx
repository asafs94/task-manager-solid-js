import type { JSXElement } from 'solid-js';
import { cx } from '~/utils';
import styles from './Chip.module.scss';

interface IProps {
    class?: string;
    children?: JSXElement;
    color?: typeof CLASSES[number];
    variant?: "default" | "secondary";
};

const CLASSES = [
    "sky", "amber", "red", "gray", "green", "indigo"
] as const;

export function Chip(props: IProps) {
    return (
        <div class={cx(styles.chip, styles[`chip-${props.color ?? 'gray'}`], { [styles.secondary]: props.variant === 'secondary' }, props.class)}>
            {props.children}
        </div>
    )
};
