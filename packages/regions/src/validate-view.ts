import { ViewDefinition } from "./view-definition";
import { invariant } from "@uxland/functional-utilities";
export const validateView = <T>(view: ViewDefinition<T>) => {
  invariant(view, "Must specify a view");
  invariant(
    view.factory || view.constr,
    "Must specify a factory or constructor"
  );
  if (view.factory)
    invariant(typeof view.factory === "function", "Factory must be a function");
  if (view.constr)
    invariant(
      typeof view.constr === "function",
      "Must provide a valid constructor"
    );
  return true;
};
