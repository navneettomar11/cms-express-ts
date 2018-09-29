import { Category } from "../models/category.model";
import { getRepository, DeleteResult } from "typeorm";

export class CategoryDao {

    public async saveCategory(category: Category): Promise<Category>{
       const categoryRepository = getRepository(Category);
       return await categoryRepository.save(category);
    }

    public async saveCategories(categories: Array<Category>): Promise<Array<Category>>{
        const categoryRepository = getRepository(Category);
        return await categoryRepository.save(categories)
     }

    public async deleteCategory(categoryId: number):Promise<DeleteResult>{
        const categoryRepository = getRepository(Category);
        return await categoryRepository.delete(categoryId);    
    }

    public async getCategoryById(categoryId:number):Promise<Category>{
        const categoryRepository = getRepository(Category);
        return await categoryRepository.findOne(categoryId);
    }

    public async getCategoryByTitle(categoryTitle:string):Promise<Category>{
        const categoryRepository = getRepository(Category);
        return await categoryRepository.findOne({title:categoryTitle});
    }

    public async getSubCategories(categoryId:number):Promise<Array<Category>>{
        const categoryRepository = getRepository(Category);
        return await categoryRepository.createQueryBuilder('category')
        .where('category.parent = :parentCatId',{parentCatId: categoryId})
        .getMany();
    }
    

}
