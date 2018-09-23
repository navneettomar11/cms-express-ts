import { Category } from "../models/category.model";

export class CategoryDao {

    public saveCategory(category: Category): Promise<Category>{
        return new Promise((resolve, reject)=>{

        });
    }

    public deleteCategory(categoryId: number){

    }

    public getSubCategories(): Promise<Array<Category>>{
        return new Promise((resolve, reject)=>{

        });
    }
    

}