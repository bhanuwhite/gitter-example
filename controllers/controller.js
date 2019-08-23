let config = require("../config/config")
const rp = require('request');

class Controller{
    constructor(){

    }
    /* function getData
	*  @purpose: Fetch data from API url
	*  @author: bhanuwhite
	*/
    getData(){
        return new Promise((resolve, reject) => {
            var options = {
                url: config.GITHUB_URL+"&per_page=75",
                method: 'GET',
                headers: {'user-agent': 'node.js'}
            }
            // api call to get all the repository with search keyword  from github
            rp(options, (error, response, body) => {    
                if(error){
                    resolve(`Page ${page}: error`)
                }
                body = JSON.parse(body);
                var items = body.items;
                var result = [];    //for storing the api calls as promise chain
                items.filter(element => {
                    result.push(this.getGitterData(element.full_name))
                })
                Promise.all(result)     //executing the promise chain
                    .then(data => {
                        data = data.filter(x=>x!="--nil--") //filtering the data with results
                        /*
                            We got the Ethereum repository which have channel on Gitters.
                            Now for saving this records into database, we can add the code here.
                        */
                        resolve(data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        })
    }
    /* function getGitterData
	*  @purpose: Fetch data from gitter url
	*  @author: bhanuwhite
	*/
    getGitterData(name){
        return new Promise((resolve, reject) => {
            var options = {
                url: config.GITTER_URL+name,
                method: 'GET',
                headers: {'user-agent': 'node.js'}
            }
            //api call to check whether the repository has a Glitter channel or not.
            rp(options, (error, response, body) => { 
                if(error){
                    resolve(`${name}: error`)
                }
                body = JSON.parse(body);
                var results = body.results;

                var res = results.filter(element=>element.name==name); //filtering out the desired repostory
                if(res.length>0){
                    resolve(res[0]);
                }             
                else{
                    resolve("--nil--")
                }
            })
        })
    }

}

module.exports = new Controller();