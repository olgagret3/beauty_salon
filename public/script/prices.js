function getGroups() {
    $.ajax({
        url: "/api/beauty_salon/groups",
        type: "GET",
        contentType: "application/json",
        dataType: 'json', 
        success: function (groups) {
            let div ="";
        	for(let i = 0; i < groups.length; i++){
               div += divs(groups[i]);
            }
        	$("#group_block").append(div);  
        }
    });
}

function divs(group){
    return `
        <div id='gr${group.id}'>
            <a  href='/api/beauty_salon/service_by_group/${group.id}'  onclick="return price(this);" ">${group.group}</a><br >
        </div>
    `;
}


function price(element){
    $.ajax({
        url: element.href,
        type: "GET",
        contentType: "application/json",
        dataType: 'json', 
        success: function (services) {
           let p ="";
            for(let i = 0; i < services.length; i++){
               p += ps(services[i]);
            }
            let id = element.parentElement.id;
            console.log(id);

            let div = document.getElementById("id");
            div.insertAdjacentHTML('beforeEnd', p); 
            
        }
    });
    return false;
}



// function openPriceList(services){
//     let p ='';
//     for(let i=0; i<div_price.length; i++){
//         div_price[i].onclick = () => {
//             for(let j=0; j<services.length; j++){
//                 p += ps(services[i]);
//             }
//             div_price[i].insertAdjacentHTML('beforeEnd', p);  
//         }
//     }
// }


function ps(service){
    return `
        <p> ${service.service} ${service.price}</p>
    `;
}

getGroups();