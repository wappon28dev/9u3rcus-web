import { css } from "panda/css";

export const contentStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "3",
  "& ol, & ul": {},
  "& h2": {
    fontSize: "2xl",
    fontWeight: "bold",
    pt: "5",
  },
  "& h3": {
    fontSize: "xl",
    fontWeight: "bold",
    pt: "3",
  },
  "& .code-block": {
    p: "5",
    color: "9u-white",
    border: "1px solid",
    borderColor: "9u-white",
    bg: "9u-brown",
    fontSize: "sm",
    "& > div": {
      bg: "9u-brown",
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid",
      borderColor: "9u-white",
    },
    "& > pre": {
      m: "3",
      overflowY: "auto",
      maxHeight: "50vh",
    },
  },
  "& p > code": {
    bgColor: "9u-brown",
    border: "1px solid",
    borderColor: "9u-white",
    color: "9u-white",
    p: "1",
    px: "2",
    fontSize: "sm",
    rounded: "sm",
  },
  "& iframe": {
    height: "100px",
  },
  "& figure": {
    width: "100%",
    maxWidth: "100%",
    mdDown: {
      p: "0",
      py: "3",
    },
    "& > *": {
      w: "fit-content",
      margin: "0 auto",
    },
    "& figcaption": {
      pt: "1",
      fontSize: "sm",
      opacity: "0.8",
    },
  },
  "& blockquote": {
    pl: "3",
    borderLeft: "5px solid",
  },
});

export const formStyle = css({
  "& > div": {
    w: "100%",
    "& label": {
      display: "block",
      fontWeight: "bold",
      fontSize: { base: "xl", mdDown: "md" },
    },
    "& input, & textarea": {
      w: "100%",
      h: "12",
      outline: "1.5px solid",
      rounded: "md",
      p: "2",
      mb: "1",
      "&:focus": {
        outlineWidth: "2px",
      },
    },
    "& textarea": {
      h: "40",
      mb: "0",
      maxH: "70vh",
      minH: "40",
    },
    "& > p": {
      fontSize: "sm",
      color: "9u-red1",
      minH: "5",
    },
  },
});
