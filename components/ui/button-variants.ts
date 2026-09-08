import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-sm border border-transparent text-base font-medium transition-colors disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // The source active color makes white, regular-size labels WCAG AA readable.
        default:
          "bg-primary-active text-primary-foreground hover:brightness-95 active:bg-primary-active disabled:bg-primary-disabled disabled:text-foreground disabled:opacity-100",
        "brand-icon":
          "bg-primary text-primary-foreground hover:bg-primary-active",
        outline:
          "border-foreground bg-background text-foreground hover:bg-muted",
        secondary: "bg-muted text-foreground hover:bg-foreground/10",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        link: "bg-transparent text-foreground underline underline-offset-4 hover:text-muted-foreground",
        destructive:
          "bg-destructive text-primary-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-12 gap-2 px-6",
        sm: "h-10 gap-2 px-4 text-sm",
        lg: "h-14 gap-2 px-8",
        icon: "size-12 rounded-full",
        "icon-sm": "size-10 rounded-full",
      },
      shape: { default: "", pill: "rounded-full" },
    },
    compoundVariants: [
      { variant: "link", className: "min-h-11 border-0 px-0" },
    ],
    defaultVariants: { variant: "default", size: "default", shape: "default" },
  },
);

export function buttonVariants(props?: Parameters<typeof buttonStyles>[0]) {
  return cn(buttonStyles(props));
}
