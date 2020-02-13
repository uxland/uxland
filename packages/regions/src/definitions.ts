
export interface IViewDefinition {
    key: string;
}

export interface IRegion {
    addView(view: IViewDefinition): IRegion;
    containsView(view: IViewDefinition): boolean;
}
