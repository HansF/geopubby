
function queryResultToMap(results) {
	const relToVal = {};
	for (const res in results) {
		if ("rel" in results[res]["rel"] && !(results[res]["rel"] in relToVal)) {
			relToVal[results[res]["rel"]] = new Set();
		} 
		if ("val" in results[res]) {
			relToVal[results[res]["rel"]].add(results[res]["val"]);
		}
	}	
	return relToVal;
}

function exportToTTL(concept, results) {
	let ttlres = "";
	const relToVal = queryResultToMap(results);
	for (const rel in relToVal) {
		for (const val of relToVal[rel]) {
			ttlres += "<" + concept + "> <" + rel + "> ";
			if (val.includes("http")) {
				ttlres += "<" + val + "> .\n";
			} else {
				ttlres += "\"" + val + "\" .\n";
			}	
		}	
	}
	return ttlres;
}

function exportToCSV(concept, results) {
	let csvres = "";
	
}