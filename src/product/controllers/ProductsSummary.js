import Response from '../../../class/response.js';
import getData from "../services/get.js";

export default async function ProductsSummaryController(req, res) {
    const response = new Response(res);

    try {
        const products = await getData({});

        const uniqueNamesMap = new Map();
        const modelCodes = [];
        const years = [];

        products.forEach(product => {
            let firstWord = product.name.split(" ")[0];

            if (firstWord.includes("-")) {
                firstWord = firstWord.split("-")[0];
            }

            if (!uniqueNamesMap.has(firstWord)) {
                uniqueNamesMap.set(firstWord, 1);
                modelCodes.push(product.modelCode);
                years.push(product.year);
            } else {
                uniqueNamesMap.set(firstWord, uniqueNamesMap.get(firstWord) + 1);
            }
        });

        const uniqueNamesWithCount = Array.from(uniqueNamesMap).map(([name, count]) => `${name} (${count})`);

        return response.success({
            name: uniqueNamesWithCount,
            modelCode: modelCodes,
            year: years
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
