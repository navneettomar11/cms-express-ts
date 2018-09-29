import {assert} from 'chai';
import { Connection } from 'typeorm';
import { initializeFunction } from '../../server/typeorm.config';
import { CategoryDao } from "../../server/dao/category.dao";
import { Category } from '../../server/models/category.model';

 
 let categoryDao:CategoryDao;
 let connection: Connection;

 let createCategoryFixture_01 = (title:string, description:string, order:number):Category =>{
    let category = new Category();
    category.title = title;
    category.description = description;
    category.order = order;
    return category;
 }

 let createCategoryFixture_02 = (title:string, description:string, order:number, parent: Category):Category =>{
    let category = new Category();
    category.title = title;
    category.description = description;
    category.order = order;
    category.parent = parent;
    return category;
 }

 describe('Category Repository',()=>{
    before( async ()=>{
        connection = await initializeFunction();
        categoryDao = new CategoryDao();
    });

    it('insert category', async ()=>{
        let category:Category = createCategoryFixture_01('category01', 'this is category01 description', 1);
        let dbCategory = await categoryDao.saveCategory(category);
        assert.equal(dbCategory, category);
        assert.isNumber(dbCategory.id);
    });

    it('update category', async()=>{
        let category:Category = createCategoryFixture_01('category01', 'this is category01 description', 1);
        category= await categoryDao.saveCategory(category);
        category.title = 'category02';
        category.description = 'this is now category2 description';
        let editCategory = await categoryDao.saveCategory(category);
        assert.notEqual(category.title, 'category01');
        assert.equal(category.title,'category02');
    });

    it('delete category', async()=>{
        let category = await categoryDao.getCategoryById(1);
        let deleteResult = await categoryDao.deleteCategory(category.id);
        assert.isTrue(deleteResult.raw.affectedRows > 0 );
    });

    it('select category by id', async()=>{
        let category:Category = createCategoryFixture_01('category02', 'this is category02 description', 1);
        category= await categoryDao.saveCategory(category);
        let dbCategory = await categoryDao.getCategoryById(category.id);
        assert.equal(dbCategory.id, category.id);
    });

    it('select category by title', async()=>{
        let dbCategory = await categoryDao.getCategoryByTitle('category02');
        assert.equal(dbCategory.title,'category02');
    });

    it('generate categories order', async ()=>{

    });

    it('get subcategories', async ()=>{
        let parentCategory = await categoryDao.getCategoryByTitle('category02');
        let subcategories = await categoryDao.saveCategories([createCategoryFixture_02('subcategory01','subcategory01',1, parentCategory),createCategoryFixture_02('subcategory02','subcategory02',2, parentCategory)]);
        console.log(parentCategory, subcategories);
        let getSubcategories:Array<Category> = await categoryDao.getSubCategories(parentCategory.id);
        assert.isNotNull(getSubcategories);
        assert.isTrue(getSubcategories.length === 2);
    });

    after(()=>{
        connection.close();
    });

 });