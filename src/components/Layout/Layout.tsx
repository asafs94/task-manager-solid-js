import  type { JSXElement, JSX, Component } from "solid-js";
import { splitProps, createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cx } from "~/utils";
import styles from "./Layout.module.scss";

const spacingOptions = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;

type SpacingOption = typeof spacingOptions[number];
type SpacingProperty = typeof SPACING_PROPERTIES[number];
type SpacingDir = typeof SPACING_DIRECTIONS[number];
type SpacingDirectionProperty = `${SpacingProperty}${SpacingDir}`;
type SpacingIrregularProperty = typeof SPACING_IRREGULARS[number];
type SpacingRecord = {
  [key in SpacingDirectionProperty | SpacingIrregularProperty]?: SpacingOption;
};
const SPACING_PROPERTIES = ["p", "m"] as const;

const SPACING_IRREGULARS = ["gap"] as const;

const SPACING_DIRECTIONS = ["", "x", "y", "t", "r", "l", "b"] as const;

const SPACING_PROPS = SPACING_PROPERTIES.flatMap((property) => {
  return SPACING_DIRECTIONS.map(
    (direction) => `${property}${direction}` as SpacingDirectionProperty
  );
});

type MustProps = {
    class?: string;  
    children?: JSXElement; 
    style?: JSX.HTMLAttributes<HTMLElement>['style']
}

type LayoutProps<T extends keyof JSX.IntrinsicElements> = SpacingRecord & JSX.HTMLAttributes<JSX.IntrinsicElements[T]> & { 
  xAlign?: JSX.CSSProperties["justify-content"];
  yAlign?: JSX.CSSProperties["justify-content"];
  flex?: JSX.CSSProperties["flex"];
  as?: T;
}

function useSpacingClasses<P extends SpacingRecord>(props: P) {
  const [spacingProps, regularProps] = splitProps(props, [
    ...SPACING_PROPS,
    "gap",
  ]);
  const spacingClasses = createMemo(() => {
    const entries = Object.entries(spacingProps);
    return entries
      .filter(([, value]) => value)
      .map(([property, value]) => `${property}-${value}`);
  });
  return [regularProps, spacingClasses] as const;
}

export function Row<T extends keyof JSX.IntrinsicElements>(props: LayoutProps<T>) {
  const [otherProps, spacingClasses] = useSpacingClasses(props);
  const [alignment, nonAlignmentProps] = splitProps(otherProps, [
    "xAlign",
    "yAlign",
  ]);
  const [style, nonStyleProps] = splitProps(nonAlignmentProps, ["flex"]);
  const [local, rest] = splitProps(nonStyleProps, ["as", "children", "class"]);
  return (
    <Dynamic
      class={cx(
        styles.flexRow,
        ...spacingClasses().map((className) => styles[className]),
        {
          [styles[`justify-${alignment.xAlign}`]]: !!alignment.xAlign,
          [styles[`items-${alignment.yAlign}`]]: !!alignment.yAlign,
        },
        local.class
      )}
      style={style}
      component={local.as ?? 'div'}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
}

export function Column<T extends keyof JSX.IntrinsicElements>(props: LayoutProps<T>){
  const [otherProps, spacingClasses] = useSpacingClasses(props);
  const [alignment, nonAlignmentProps] = splitProps(otherProps, [
    "xAlign",
    "yAlign",
  ]);
  const [style, nonStyleProps] = splitProps(nonAlignmentProps, ["flex"]);
  const [local, rest] = splitProps(nonStyleProps, ["children", "as", "class"]);
  return (
    <Dynamic
      class={cx(
        styles.flexCol,
        ...spacingClasses().map((className) => styles[className]),
        {
          [styles[`items-${alignment.xAlign}`]]: !!alignment.xAlign,
          [styles[`justify-${alignment.yAlign}`]]: !!alignment.yAlign,
        },
        local.class
      )}
      component={local.as ?? 'div'}
      style={style}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
}
