import { products } from "./constants/data.js";
import Product from "./models/productSchema.js";


const DefaultData = async() => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(products);

        console.log("Data imported successfully")
    } catch (error) {
        console.log('Error while inserting data', error.message)
    }
}

export default DefaultData;