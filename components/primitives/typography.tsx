import { VariantProps, cva } from "class-variance-authority";

export const typographyVariants = cva("typography-transition", {
  variants: {
    variant: {
      default: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type TypographyVariants = VariantProps<typeof typographyVariants>;

export function Typography({
  as: Component = "p",
  variant,
  className = "",
  ...props
}: TypographyVariants & {
  as?: React.ElementType;
} & React.ComponentPropsWithoutRef<"p">) {
  return (
    <Component
      className={typographyVariants({ variant, className })}
      {...props}
    />
  );
}
