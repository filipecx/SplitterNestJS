export interface IntMessagePublisher {
    publish(payload: any): Promise<void>;
}