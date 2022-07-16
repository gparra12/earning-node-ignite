import { Specification } from "../model/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ description, name }: ICreateSpecificationDTO): void;
  findSpecificationByName(name: string): Specification;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
