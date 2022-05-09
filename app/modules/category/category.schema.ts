import { Schema, model, Document } from "mongoose";
import { ICategory } from "./category.types";

class CategorySchema extends Schema {
    constructor() {
        super({
            category: {
                type: String,
                enum: ['PROCEDURAL', 'DOCUMENTAL','CLINICAL'],
                required: true
            }
        })
    }
}

type CategoryDocument = Document & ICategory;
const CategoryModel = model<CategoryDocument>('Category', new CategorySchema());
export default CategoryModel;