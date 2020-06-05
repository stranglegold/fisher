const faker = require('faker');
const fs = require('fs');

function generateRandomCatchesForFishermans(fishermans){
    let fishermans_catches = {}

    fishermans.map(fisherman =>{
        fishermans_catches[fisherman.id] = generateRandomCatches()
    })

    return fishermans_catches
}

function generateRandomEquipmentForFishermans(fishermans){
    let equipment = {}

    fishermans.map(fisherman => {
        equipment[fisherman.id] = generateRandomEquipment()
    })

    return equipment
}

function generateRandomCatches(){

    const species = ["Alien","Megalodon","Bloop","Moby dick"]
    let catches = []


    for(let i = 0; i < 3; i++){

        let dateOfCatch = faker.date.recent(4000)
        let formattedDateOfCatch = dateOfCatch.getFullYear() + "-" + (dateOfCatch.getMonth() + 1) + "-" + dateOfCatch.getDate()
        let randomSpecie = species[Math.floor(Math.random()*4)]

        catches.push({
            date: formattedDateOfCatch,
            specie: randomSpecie,
            weight: Math.random()*100,
            lake: `${faker.name.lastName()} Lake`,
            coordinates: `(${faker.random.number()},${faker.random.number()})`
        })
    }

    return catches
}

function generateRandomEquipment(){
    return {
            rods: [{
                type: "Rod",
                name: `${faker.name.firstName()}\'s Extra Super Rod`,
                material: "Fiberglass",
                weight: Math.random() * 100,
                length: Math.floor(Math.random() * 6) + 1,
            }],
            bait: [{
                type: "Boilie",
                name: `${faker.name.firstName()}\'s Extra Super Boilies`,
                flavour: "Peach",
                weight: Math.floor(Math.random() * 6) + 1,
                melting: "no"
            }],
            other: [{
                type: "Tent",
                name: `${faker.name.firstName()}\'s Extra Super Tent`,
                weight: Math.random() * 1000,
                size: "10x10",
                other_info: "Max People: 3"
            }]
        }
}

function generateRandomFishermans(){
    let fisherman = []

    for(let i = 0;i < 100; i++){
        fisherman.push({
            id: faker.random.number(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            state: faker.address.state(),
            address: faker.address.streetAddress(),
        })
    }

    return fisherman
}

const all_fisherman = generateRandomFishermans()

fs.writeFile(
  '../../database.fake.json',
  JSON.stringify({fishermans:all_fisherman,
  catches: generateRandomCatchesForFishermans(all_fisherman),
  equipments: generateRandomEquipmentForFishermans(all_fisherman)}),
    (error) => {console.log(error)}
)