import { Category } from "../models/category.model";
import { getRepository } from "typeorm";

export class CategoryDao {

    public async saveCategory(category: Category): Promise<Category>{
       const categoryRepository = getRepository(Category);
       return await categoryRepository.save(category);
    }

    public async deleteCategory(categoryId: number){
        const categoryRepository = getRepository(Category);
        return await categoryRepository.delete(categoryId);    
    }

    public getSubCategories(): Promise<Array<Category>>{
        return new Promise((resolve, reject)=>{

        });
    }
    

}
