import Response from '../../../class/response.js';
import getData from "../services/get.js";

export default async function ProductsSummaryController(req, res) {
    const response = new Response(res);
    let { name, modelCode, year } = req.query;

    if (name) name = name.toUpperCase();
    if (modelCode) modelCode = modelCode.toUpperCase();
    if (year) year = year.toUpperCase();

    try {
        const products = await getData({});

        const uniqueNamesMap = new Map();
        const modelCodesMap = new Map();
        const uniqueYearsMap = new Map();

        products.forEach(product => {
            let firstWord = product.name.split(" ")[0].toUpperCase();
            if (firstWord.includes("-")) {
                firstWord = firstWord.split("-")[0];
            }

            if (!uniqueNamesMap.has(firstWord)) {
                uniqueNamesMap.set(firstWord, 0);
            }
            uniqueNamesMap.set(firstWord, uniqueNamesMap.get(firstWord) + 1);

            if (!modelCodesMap.has(product.modelCode.toUpperCase())) {
                modelCodesMap.set(product.modelCode.toUpperCase(), new Set());
            }
            modelCodesMap.get(product.modelCode.toUpperCase()).add(product.year.trim().toUpperCase());

            if (!uniqueYearsMap.has(product.year.trim().toUpperCase())) {
                uniqueYearsMap.set(product.year.trim().toUpperCase(), new Set());
            }
            uniqueYearsMap.get(product.year.trim().toUpperCase()).add(product.modelCode.toUpperCase());
        });

        let filteredData = {
            name: Array.from(uniqueNamesMap, ([key, value]) => `${key} (${value})`), // Use actual product count
            modelCode: Array.from(modelCodesMap.keys()),
            year: Array.from(uniqueYearsMap.keys()).sort()
        };

        if (name) {
            const filteredProductsByName = products.filter(p => {
                let productFirstWord = p.name.split(" ")[0].toUpperCase();
                if (productFirstWord.includes("-")) {
                    productFirstWord = productFirstWord.split("-")[0];
                }
                return productFirstWord === name;
            });

            filteredData.modelCode = Array.from(new Set(filteredProductsByName.map(p => p.modelCode.toUpperCase())));
            filteredData.year = Array.from(new Set(filteredProductsByName.map(p => p.year.trim().toUpperCase()))).sort();
        }

        if (modelCode) {
            const validYears = modelCodesMap.has(modelCode) ? Array.from(modelCodesMap.get(modelCode)) : [];
            if (name) {
                filteredData.year = filteredData.year.filter(y => validYears.includes(y));
            } else {
                filteredData.modelCode = [modelCode];
                filteredData.year = validYears;
            }
        }

        if (year) {
            const validModelCodes = uniqueYearsMap.has(year) ? Array.from(uniqueYearsMap.get(year)) : [];
            if (!name && !modelCode) {
                filteredData.modelCode = validModelCodes;
                filteredData.year = [year];
            }
        }

        filteredData.name = Array.from(uniqueNamesMap, ([key, value]) => `${key} (${value})`);

        return response.success(filteredData, "Summary Get Successfully");
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