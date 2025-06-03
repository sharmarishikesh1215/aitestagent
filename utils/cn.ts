const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

import clsx from "clsx";
export { clsx as cn };