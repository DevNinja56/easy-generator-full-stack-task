import { Injectable } from "@nestjs/common";
import { EntityRepository } from "./repository/entity.repository";
import { IEntity, IFindQuery } from "./interface/entity.interface";

@Injectable()
export abstract class EntityServices {
  /**
   * Constructs a new instance of the EntityService class.
   * @param entityRepository The repository for the entity.
   */
  constructor(private readonly entityRepository: EntityRepository<IEntity>) {}

  /**
   * Creates a new entity.
   * @param createEntityDto The DTO for creating the entity.
   * @returns The created entity.
   */
  async create(createEntityDto: unknown): Promise<IEntity> {
    return this.entityRepository.create(createEntityDto);
  }

  /**
   * Finds all entities based on the provided query parameters.
   * @param query The query parameters for finding entities.
   * @returns An array of entities.
   */
  async findAll(query: IFindQuery) {
    return this.entityRepository.find(query);
  }

  /**
   * Finds entities with pagination based on the provided query parameters.
   * @param query The query parameters for finding entities with pagination.
   * @returns An array of entities with pagination information.
   */
  async findAllWithPagination(query: IFindQuery) {
    return this.entityRepository.findWithPagination(query);
  }

  /**
   * Finds a single entity based on the provided condition and projection.
   * @param condition The condition for finding the entity.
   * @param projection The projection for the entity.
   * @returns The found entity.
   */
  async findOne(
    condition: object,
    projection?: Record<string, unknown>
  ): Promise<IEntity> {
    return this.entityRepository.findOne({ ...condition }, projection);
  }

  /**
   * Updates an entity based on the provided condition and update DTO.
   * @param condition The condition for updating the entity.
   * @param updateEntityDto The DTO for updating the entity.
   * @param type The type of update operation to perform.
   * @returns The updated entity.
   */
  async update(
    condition: object,
    updateEntityDto: unknown,
    type: "set" | "push" | "static" | "pull" = "set"
  ): Promise<IEntity> {
    return this.entityRepository.findOneAndUpdate(
      { ...condition },
      updateEntityDto,
      type
    );
  }

  /**
   * Removes an entity based on the provided condition.
   * @param condition The condition for removing the entity.
   * @returns The removed entity or unknown.
   */
  async remove(condition: object): Promise<IEntity | unknown> {
    return this.entityRepository.remove({ ...condition });
  }
}
