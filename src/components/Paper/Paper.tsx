import type { JSXElement } from 'solid-js';
import styles from './Paper.module.scss';

interface IProps {
    class?: string;
    children?: JSXElement;
};

export function Paper(props: IProps) {
    return (
        <div class={props.class}>
            {props.children}
        </div>
    )
};
