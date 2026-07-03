import type { CategoryRepository } from "../../../categories/domain/repositories/CategoryRepository.js";
import type { TransactionRepository } from "../../../transactions/domain/repositories/TransactionRepository.js";

export type GetCategorySummaryInput = {
  userId: string;
  month: number;
  year: number;
};

export type CategorySummaryItem = {
  categoryId: string;
  categoryName: string;
  total: number;
};

export class GetCategorySummaryUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  public async execute(input: GetCategorySummaryInput): Promise<CategorySummaryItem[]> {
    const transactions = await this.transactionRepository.listByUserId(input.userId, {
      month: input.month,
      year: input.year
    });

    const totalsById = new Map<string, number>();
    for (const transaction of transactions) {
      const current = totalsById.get(transaction.categoryId) ?? 0;
      totalsById.set(transaction.categoryId, current + transaction.amount);
    }

    const categories = await this.categoryRepository.listByUserId(input.userId);

    const summary: CategorySummaryItem[] = [];
    for (const category of categories) {
      const total = totalsById.get(category.id);
      if (total !== undefined) {
        summary.push({
          categoryId: category.id,
          categoryName: category.name,
          total
        });
      }
    }

    return summary;
  }
}
