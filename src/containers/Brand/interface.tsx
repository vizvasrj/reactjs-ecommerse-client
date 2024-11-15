export interface Brand {
    _id: string;
    name: string;
    description: string;
    merchant?: {
        _id: string;
        name: string;
    };
    slug: string;
    // TODO: may be this should not be in here?
    value?: string;
    label?: string;
}
