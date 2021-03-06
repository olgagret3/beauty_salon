//href="/api/beauty_salon/service/${service.id}

function getServices() {
    $.ajax({
        url: "/api/beauty_salon/services",
        type: "GET",
        contentType: "application/json",
        dataType: 'json', 
        success: function (services) {
        	let group = groups(services);
        	for(let i = 0; i < group.length; i++){
        		let div = `<div> <h2> ${group[i]} </h2> </div>`;
        		for(let j = 0; j < services.length; j++){
        			if(services[j].group === group[i])
        				div += divs(services[j]);
        		}
        		$("#service_block").append(div); 
        	}  
        }
    });
}

function groups(services){
    let group = [];
    for (let i = 0; i < services.length; i++){
        if(!(group.some((gr) => {return gr === services[i].group}))){
            group.push(services[i].group);
        }
    }
    return group;
}

function divs(service){
    return `
        <a  href='/api/beauty_salon/service/${service.id}'  onclick="return service(this);" ">${service.service}</a><br >
    `;
}

function service(element){
    $.ajax({
        url: element.href,
        type: "GET",
        contentType: "application/json",
        dataType: 'json', 
        success: function (service) {
            console.log(service[0]);
        }
    });
    return false;
}


getServices();