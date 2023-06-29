"use client";

const NewBlank = (props: any) => {
  return (
    <button
      {...props}
      onClick={() => {
        window.open(props.href, "_blank");
      }}
    >
      {props.children}
    </button>
  );
};

export default NewBlank;
