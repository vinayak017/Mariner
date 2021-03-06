import { OwnerDataCollection } from './owner-data-collection';
import { RequestQueue } from './request-queue';

export type RequestParams = {
    owner: string;
    repo?: string;
    type: string;
    label?: string;
};

export abstract class DataFetcher<ResultType> {
    public process(
        requestParams: RequestParams,
        ownerDataCollection: OwnerDataCollection,
        requestQueue: RequestQueue
    ): Promise<void> {
        return this.executeRequest(requestParams).then((result) => {
            this.updateOwnerDataCollection(requestParams, result, ownerDataCollection);
            this.updateRequestQueue(requestParams, result, requestQueue);
        });
    }
    protected abstract executeRequest(params: RequestParams): Promise<ResultType>;
    protected abstract updateOwnerDataCollection(
        params: RequestParams,
        result: ResultType,
        ownerDataCollection: OwnerDataCollection
    ): void;
    protected updateRequestQueue(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        params: RequestParams,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        result: ResultType,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        requestQueue: RequestQueue
    ): void {
        // Implemented by subclasses
    }
}
