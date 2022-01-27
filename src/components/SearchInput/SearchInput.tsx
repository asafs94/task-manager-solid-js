import { splitProps } from 'solid-js';
import type { JSX } from 'solid-js';
import styles from './SearchInput.module.scss';
import { cx } from '~/utils';
import { Icon, InputBase } from '..';

interface IProps extends JSX.InputHTMLAttributes<HTMLInputElement>{
    onButtonClick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
};

export function SearchInput(props: IProps) {
    const [local, inputProps] = splitProps(props, ['class', 'onButtonClick']);
    return (
        <div class={cx(styles.root, local.class)}>
            <InputBase class={styles.input} {...inputProps}/>
            <button class={styles.btn} onClick={local.onButtonClick}>
                <Icon type="search" />
            </button>
        </div>
    )
};
