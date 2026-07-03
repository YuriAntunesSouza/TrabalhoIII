import type { Category } from "../../domain/entities/Category.js";
import type { CategoryRepository } from "../../domain/repositories/CategoryRepository.js";

export class InMemoryCategoryRepository implements CategoryRepository {
  private readonly categories: Category[] = [];

  public async findById(id: string): Promise<Category | null> {
    return this.categories.find((category) => category.id === id) ?? null;
  }

  public async findByUserIdAndName(userId: string, name: string): Promise<Category | null> {
    const normalizedName = name.trim().toLowerCase();
    return (
      this.categories.find(
        (category) => category.userId === userId && category.name.toLowerCase() === normalizedName
      ) ?? null
    );
  }

  public async listByUserId(userId: string): Promise<Category[]> {
    return this.categories.filter((category) => category.userId === userId);
  }

  public async create(category: Category): Promise<void> {
    this.categories.push(category);
  }
}
