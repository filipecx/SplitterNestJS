import { IntProductRepository } from "../../../Infrastructure/Interfaces/IntProductRepository";
import { Id } from "../ValueObjects/Id";
import { NotFoundError } from "./Errors/NotFoundError";

export class DeleteProductUseCase {
    constructor(private repository: IntProductRepository){}

    async execute(id: Id): Promise<any> {
        const product = await this.repository.get(id);
        if (!product) {
            throw new NotFoundError("Nenhum produto com esse id foi encontrado");
        }
        this.repository.delete(id);
    }
}