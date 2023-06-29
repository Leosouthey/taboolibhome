"use client";

import { Button } from "@/components/ui/button";

const NewBlank = (props: any) => {
  if (props.button) {
    return (
      <Button
        {...props}
        onClick={() => {
          window.open(props.href, "_blank");
        }}
      >
        {props.children}
      </Button>
    );
  } else {
    return (
      <div
        {...props}
        onClick={() => {
          window.open(props.href, "_blank");
        }}
      >
        {props.children}
      </div>
    );
  }
};

export default NewBlank;
