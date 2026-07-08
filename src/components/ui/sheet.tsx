"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Sheet = (props: Dialog.DialogProps) => {
  return <Dialog.Root {...props} />;
};

export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
    className?: string;
    side?: "top" | "bottom" | "left" | "right";
  }
>(({ className, side = "right", children, ...props }, ref) => {
  const positionClasses = {
    top: "top-0 left-0 right-0",
    bottom: "bottom-0 left-0 right-0",
    left: "left-0 top-0 bottom-0",
    right: "right-0 top-0 bottom-0",
  };

  const sizeClasses = {
    top: "w-full",
    bottom: "w-full rounded-t-3xl",
    left: "w-[320px] h-full",
    right: "w-[320px] h-full",
  };

  const animationClasses = {
    top: `
      data-[state=open]:animate-in
      data-[state=closed]:animate-out
      data-[state=open]:slide-in-from-top
      data-[state=closed]:slide-out-to-top
    `,
    bottom: `
      data-[state=open]:animate-in
      data-[state=closed]:animate-out
      data-[state=open]:slide-in-from-bottom
      data-[state=closed]:slide-out-to-bottom
    `,
    left: `
      data-[state=open]:animate-in
      data-[state=closed]:animate-out
      data-[state=open]:slide-in-from-left
      data-[state=closed]:slide-out-to-left
    `,
    right: `
      data-[state=open]:animate-in
      data-[state=closed]:animate-out
      data-[state=open]:slide-in-from-right
      data-[state=closed]:slide-out-to-right
    `,
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className={cn(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm",
          "data-[state=open]:animate-in",
          "data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0",
          "data-[state=closed]:fade-out-0"
        )}
      />

      <Dialog.Content
        ref={ref}
        className={cn(
          "fixed z-50 bg-background shadow-2xl outline-none duration-300",
          positionClasses[side],
          sizeClasses[side],
          animationClasses[side],
          className
        )}
        {...props}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
});

SheetContent.displayName = "SheetContent";

export const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col text-center sm:text-left", className)}
    {...props}
  />
);

export const SheetTitle = Dialog.Title;
export const SheetDescription = Dialog.Description;