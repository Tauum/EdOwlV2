export default class LocalStorageFunctions {

    static getLocalActivities(){
        var localActivities = localStorage.getItem("Local-Activities");
        if (localActivities === null){ LocalStorageFunctions.createLocalActivities()  }
        return JSON.parse(localStorage.getItem("Local-Activities"))
    }
    static createLocalActivities(){
        return localStorage.setItem('Local-Activities', JSON.stringify([]));
    }

    static checkElementExists(localActivities, object){
        return localActivities.some((element) => JSON.stringify(element) === JSON.stringify(object)) // returns boolean
    }

    static insertElement(object){
        var localActivities = LocalStorageFunctions.getLocalActivities()
        if (LocalStorageFunctions.checkElementExists(localActivities, object) === true){ return false }
        else{
            localActivities.push(object)
            localStorage.setItem('Local-Activities', JSON.stringify(localActivities));
            return true
        }
    }
    static removeElement(object){
        var localActivities = LocalStorageFunctions.getLocalActivities()

    }
}