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
                uniqueNamesMap.set(firstWord, new Set());
            }
            uniqueNamesMap.get(firstWord).add(product.modelCode.toUpperCase());

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
            name: [],
            modelCode: [],
            year: []
        };

        if (name) {
            const nameData = uniqueNamesMap.has(name) ? Array.from(uniqueNamesMap.get(name)) : [];
            filteredData.name = [name];
            filteredData.modelCode = nameData;
            filteredData.year = Array.from(new Set(products.filter(p => p.name.toUpperCase().startsWith(name)).map(p => p.year.trim().toUpperCase())));
            if (!nameData.length) return response.error([], "No car found for the given name", 404);
        }
        if (year) {
            const yearData = uniqueYearsMap.has(year) ? Array.from(uniqueYearsMap.get(year)) : [];
            if (name) {
                filteredData.year = [year];
                filteredData.modelCode = filteredData.modelCode.filter(mc => yearData.includes(mc));
            } else {
                filteredData.year = [year];
                filteredData.modelCode = yearData;
                filteredData.name = Array.from(new Set(products.filter(p => p.year.trim().toUpperCase() === year).map(p => p.name.split(" ")[0].toUpperCase())));
            }
            if (!yearData.length) return response.error([], "No car found for the given year", 404);
        }
        if (modelCode) {
            filteredData.modelCode = [modelCode];
            filteredData.year = modelCodesMap.has(modelCode) ? Array.from(modelCodesMap.get(modelCode)) : [];
            filteredData.name = Array.from(new Set(products.filter(p => p.modelCode.toUpperCase() === modelCode).map(p => p.name.split(" ")[0].toUpperCase())));
            if (!filteredData.year.length) return response.error([], "No car found for the given model code", 404);
        }

        if (!name && !modelCode && !year) {
            filteredData = {
                name: Array.from(uniqueNamesMap.keys()),
                modelCode: Array.from(modelCodesMap.keys()),
                year: Array.from(uniqueYearsMap.keys()).sort()
            };
        }

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


