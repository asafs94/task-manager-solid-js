import { splitProps } from 'solid-js';
import { 
    HiSolidSearch, 
    HiSolidFilter, 
    HiSolidChevronDown, 
    HiSolidChevronRight, 
    HiSolidClock, 
    HiSolidDotsHorizontal, 
    HiSolidX, 
    HiSolidPlus,
    HiSolidSun,
    HiSolidMoon 
} from 'solid-icons/hi';
import { Dynamic } from 'solid-js/web';
import { cx } from '~/utils';

interface IProps {
    class?: string;
    type: keyof typeof COMPONENT_MAP;
    color?: 'primary' | 'secondary';
};

const COMPONENT_MAP = {
    search: HiSolidSearch,
    filter: HiSolidFilter,
    "chevron-down": HiSolidChevronDown,
    "chevron-right": HiSolidChevronRight,
    clock: HiSolidClock,
    'ellipsis-h': HiSolidDotsHorizontal,
    close: HiSolidX,
    plus: HiSolidPlus,
    sun: HiSolidSun,
    moon: HiSolidMoon,
}

export function Icon(props: IProps) {
    const [local, rest] = splitProps(props, ['type', 'class', 'color']);
    return (
        <Dynamic class={cx('icon', { [`foreground-${local.color}`]: !!local.color }, local.class)} component={COMPONENT_MAP[local.type]} {...rest} />
    )
};
