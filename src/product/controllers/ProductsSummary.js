import Response from '../../../class/response.js';
import getData from "../services/get.js";

export default async function ProductsSummaryController(req, res) {
    const response = new Response(res);

    try {
        const products = await getData({});

        const uniqueNamesMap = new Map();
        const modelCodes = [];
        const uniqueYears = new Set();

        products.forEach(product => {
            let firstWord = product.name.split(" ")[0];

            if (firstWord.includes("-")) {
                firstWord = firstWord.split("-")[0];
            }

            
            if (!uniqueNamesMap.has(firstWord)) {
                uniqueNamesMap.set(firstWord, 1);
            } else {
                uniqueNamesMap.set(firstWord, uniqueNamesMap.get(firstWord) + 1);
            }

         
            modelCodes.push(product.modelCode);

         
            uniqueYears.add(product.year.trim());
        });

        const uniqueNamesWithCount = Array.from(uniqueNamesMap).map(([name, count]) => `${name} (${count})`);
        const uniqueYearsArray = Array.from(uniqueYears); 
      
        return response.success({
            name: uniqueNamesWithCount, 
            modelCode: modelCodes,  
            year: uniqueYearsArray.sort(),  
        }, "Summary Get Successfully");

    } catch (error) {
        let messages = [];
        if (error.errors) {
            for (let field in error.errors) {
                messages.push(error.errors[field].message);
            }
        } else {
            messages.push(error.message);
        }
        return response.error(messages, "Internal Server Error", 500);
    }
}
