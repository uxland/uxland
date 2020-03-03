import { IRegion } from './region';

export interface ViewComponent {
    active?: boolean;
    region?: IRegion;
    view?: IView;
    viewKey?: string;
}

export interface ViewFactory {
    (view: IView): Promise<ViewComponent>;
}

export interface IView {
    key: string;
    viewFactory: ViewFactory;
}
