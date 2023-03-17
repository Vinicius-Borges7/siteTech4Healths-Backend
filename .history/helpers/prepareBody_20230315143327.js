module.exports = function prepareBody(body){
	let bodyKeys = [];
	let bodyValues = [];
	let members = [];
	let scholars = [];

	for(let i in body){
	  bodyKeys.push(i);
	  bodyValues.push(body[i])
	}

	bodyKeys.forEach((e) => {
	  if(e.charAt(1) == 'e'){
		members.push(
		  {
			"name" :  bodyValues[bodyKeys.indexOf(e)]
		  }
		)
	  }
	})

	bodyKeys.forEach((e) => {
	  if(e.charAt(1) == 'c'){
		scholars.push(
		  {
			"name" :  bodyValues[bodyKeys.indexOf(e)]
		  }
		)
	  }
	})

	body.members = members;
	body.scholars = scholars;
	body.vigency = new Date(body.dataFim);
	body.status = status(body);

	console.log(body);
	
	return body;	
}


	
function status(body){
	let status;
	let end = new Date(body.dataFim);
	let end = new Date(body.dataFim);
	let today = new Date();
	
	dateEnd = {
		"day": end.getDate(),
		"month": end.getMonth() + 1,
		"year": end.getFullYear(),
		"value": end.getDate() + (end.getMonth() + 1)
	}
	
	dateToday = {
		"day": today.getDate(),
		"month": today.getMonth() + 1,
		"year": today.getFullYear(),
		"value": today.getDate() + (today.getMonth() + 1)
	}
	if(){

	}else{
		if(this.dateToday.value > this.dateEnd.value){ // já passo do fim
			status = "Concluído";
		}else{ //(this.dateToday.value < this.dateEnd.value) 
			status = "Em Andamento";
		}
	}
	
	return status;	
}

