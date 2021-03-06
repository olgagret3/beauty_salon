$(document).ready(function() {
    getRecords();

}); 

function getRecords() {
    $.ajax({
        url: "/api/beauty_salon/records_client",
        type: "GET",
        contentType: "application/json",
        dataType: 'json', 
        success: function (records) {   
            console.log(records);
            let table=`<tr><td class="round-top">${records[0].service}</td><td>${records[0].date}</td> <td>${records[0].time}</td><td>${records[0].price}</td></tr>`;
            for(let i = 1; i < (records.length-1); i++)
                table += `<tr><td>${records[i].service}</td><td>${records[i].date}</td> <td>${records[i].time}</td><td>${records[i].price}</td></tr>`;
            let length = records.length;
            table += `<tr><td class="round-bottom">${records[length-1].service}</td><td>${records[length-1].date}</td> <td>${records[length-1].time}</td><td>${records[length-1].price}</td></tr>`;
            $('.zebra').append(table);
        }
    });
}
