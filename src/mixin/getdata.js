export const getIdData =  {

    methods:{
        getIdData: async function(id) {    
            return fetch('https://hacker-news.firebaseio.com/v0/item/'+id+'.json')
                    .then( resp => resp.json());   
        
      }
    }    
}

export const getIdsData =  {

    methods:{
        dowloadIds: async function(type) {
            return fetch('https://hacker-news.firebaseio.com/v0/'+type+'stories.json')
                    .then( resp => resp.json());      
        }
    }    
}


export class Item {
    constructor() {
      this.time = new Date().getTime() / 1000;
      this.by = "MattiaAvanzi";
      
    }
  }