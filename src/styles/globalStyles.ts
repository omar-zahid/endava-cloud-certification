import { makeStaticStyles, tokens } from "@fluentui/react-components";

export const useGlobalStyles = makeStaticStyles({
  ":global(html), :global(body), :global(#root)": {
    height: "100%",
  },
  ":global(*), :global(*::before), :global(*::after)": {
    boxSizing: "border-box",
  },
  ":global(body)": {
    margin: "0",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },
});
