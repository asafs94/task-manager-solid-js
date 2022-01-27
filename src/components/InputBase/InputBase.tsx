import { cx } from '~/utils';
import { splitProps } from 'solid-js';
import type { JSX } from 'solid-js'
import styles from './InputBase.module.scss';

interface IProps extends JSX.InputHTMLAttributes<HTMLInputElement> {

};

export function InputBase(props: IProps) {
    const [local, rest] = splitProps(props, ['class'])
    return (
        <input class={cx(styles.root, local.class)} {...rest} />
    )
};
