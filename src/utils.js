export function csvToJSONConversion(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].substring(0, lines[0].lastIndexOf(",")).split(',')//lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].substring(0, lines[i].lastIndexOf(",")).split(',')//lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return JSON.stringify(result);
}

export function getRange(start, end) {
    var list = [];
    for (var i = start; i <= end; i++) {
        list.push(i);
    }
    return list;
}

export function searchNameAndSortYear(searchWord, data, sortValue){
    let filtered_data = data;
    if(searchWord != "" && searchWord != null && searchWord != " "){
        filtered_data = data.filter((item) => {
            if(Object.keys(item).indexOf("Name") != -1 ){
                return item.Name.toLowerCase().indexOf(searchWord.toLowerCase()) != -1;
            }
        });
    }

    let sorted_data = filtered_data;
    if(sortValue != "none" && sortValue != null && sortValue != " " && sortValue != "" ){
        if(sortValue == "asc"){
            sorted_data = filtered_data.sort((a,b) => {
                return parseInt(a.Year) - parseInt(b.Year);
            });
        }
        else if(sortValue == "desc"){
            sorted_data = filtered_data.sort((a,b) => {
                return parseInt(b.Year) - parseInt(a.Year);
            });
        }
    }
    return sorted_data;
}


