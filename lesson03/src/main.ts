let username = "onkar";
console.log(username);


let stringArr:string[] = ["one", 'hey', 'dave'];



let guitars = ['Strat', 'Les Paul', 5150];


let mixData = ['EVH', 1984, true];

stringArr[0] = 'onkar';
stringArr.push('hey')
guitars[0] = 1999;
mixData = guitars

// guitars = mixData. //CAN NOT DO THAT 

console.log(stringArr)


let test = [];
let bands:string[] = ['one', 'two']

bands.push("true");


//Tupe

let myTuple: [string, number, boolean] = ['dave', 42, true];


let mixed = ['jhon', 1, false]

mixed = myTuple;
// myTuple = mixed //can not do that beacause typescript mixed could be less element

myTuple[1] = 43;

console.log(myTuple)


//Objects

let myObj:object
myObj = [];
console.log(typeof myObj);
myObj = bands;
myObj = {};


const exampleObj = {
    prop1:'dave',
    prop2:true,
}


exampleObj.prop1 = 'no';
// exampleObj.prop2 = "yes"; //automatic infer we not mention the type
type Guitarist={
    name:string,
    active:boolean,
    albums:(string| number)[]

}
 let evh:Guitarist = {
    name:"ponka",
    active:true,
    albums:[19983,3902,3902]
 }

 let JP:Guitarist = {
    name:"NEW",
    active:true,
    albums:['i',"3902","3902"]
 }


 JP = evh;
 