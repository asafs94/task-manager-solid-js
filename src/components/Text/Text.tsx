import { splitProps } from "solid-js";
import type { Component, JSXElement, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cx } from "~/utils";
import styles from "./Text.module.scss";

const classes = [
  "body-1",
  "body-2",
  "heading-1",
  "heading-2",
  "heading-3",
  "heading-4",
  "small-1",
  "small-2",
  "placeholder",
] as const;

const colors = [
  "primary",
  "secondary",
  "link",
  "error",
  "inherit",
  "placeholder",
] as const;

interface IProps {
  class?: string;
  children?: JSXElement;
  variant?: typeof classes[number];
  color?: typeof colors[number];
  truncate?: boolean;
  as?: string;
}

export function Text(props: IProps) {
  const [local, rest] = splitProps(props, [
    "as",
    "truncate",
    "children",
    "variant",
    "class",
    "color",
  ]);
  return (
    <Dynamic
      component={local.as ?? "span"}
      class={cx(
        { truncate: local.truncate },
        styles[`variant-${local.variant}`],
        styles[`color-${local.color ?? "inherit"}`],
        local.class
      )}
      {...rest}
    >
      {props.children}
    </Dynamic>
  );
}
