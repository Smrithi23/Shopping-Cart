var Item = require('../models/item')

var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/WebProject',
{
    useNewUrlParser : true
})

var products = [
    new Item({
        name: 'Apple iPad Air (Tablet)',
        description: 'Tablet',
        store: 'Amazon',
        price: 1079,
        quantity: 20,
        image: '/uploads/AppleiPadair.jpg'
    }),
    new Item({
        name: 'Apple iPhone (Mobile)',
        description: 'Mobile',
        store: 'Amazon',
        price: 1150,
        quantity: 20,
        image: '/uploads/AppleiPhone.jpg'
    }),
    new Item({
        name: 'Dell G5 Laptop',
        description: 'Laptop',
        store: 'Amazon',
        price: 1813,
        quantity: 20,
        image: '/uploads/DellG5.jpeg'
    }),
    new Item({
        name: 'HP Omen Laptop',
        description: 'Laptop',
        store: 'Amazon',
        price: 1549,
        quantity: 20,
        image: '/uploads/hp_omen.jpeg'
    }),
    new Item({
        name: 'Huawai P20 Laptop',
        description: 'Laptop',
        store: 'Amazon',
        price: 1299,
        quantity: 20,
        image: '/uploads/HuawaiP20.jpg'
    }),
    new Item({
        name: 'Lenovo Thinkpad Laptop',
        description: 'Laptop',
        store: 'Amazon',
        price: 1099,
        quantity: 20,
        image: '/uploads/lenovo_thinkpad.jpeg'
    }),
    new Item({
        name: 'LG Gram Ultra Laptop',
        description: 'Laptop',
        store: 'Amazon',
        price: 1199.10,
        quantity: 20,
        image: '/uploads/LGgramUltra.jpeg'
    }),
    new Item({
        name: 'Samsung Radiant Speaker',
        description: 'Speaker',
        store: 'Amazon',
        price: 499.00,
        quantity: 20,
        image: '/uploads/SamsungRadiant.jpg'
    }),
    new Item({
        name: 'Acer Aspire 5 Slim Laptop',
        description: 'Laptop',
        store: 'Amazon',
        price: 1599.99,
        quantity: 20,
        image: '/uploads/AcerAspire5SlimLaptop.jpg'
    }),
    new Item({
        name: 'Amazon Essential Men Long Sleeves Linen Shirt',
        description: 'Shirt',
        store: 'Amazon',
        price: 21.20,
        quantity: 20,
        image: '/uploads/AmazonEssentialMenLongSleevesLinenShirt.jpg'
    }),
    new Item({
        name: 'Amazon Essential Men\'s Skinny Fit Stretch Jeans',
        description: 'Jeans',
        store: 'Amazon',
        price: 10.99,
        quantity: 20,
        image: '/uploads/AmazonEssentialsMensSkinnyFitStretchJeans.jpg'
    }),
    new Item({
        name: 'Atopia Chronicles by Mathew Mather (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 6.99,
        quantity: 20,
        image: '/uploads/AtopiaChronicles-MathewMather.jpg'
    }),
    new Item({
        name: 'Catalyst - A Breakthrough Story by Michael C.Grumley (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 7.25,
        quantity: 20,
        image: '/uploads/Catalyst(ABreakthroughStory)MichaelC.Grumley.jpg'
    }),
    new Item({
        name: 'Champion Mens Classic Jersey Script T-Shirt',
        description: 'T-Shirt',
        store: 'Amazon',
        price: 20.99,
        quantity: 20,
        image: '/uploads/ChampionMensClassicJerseyScriptT-Shirt.jpg'
    }),
    new Item({
        name: 'Copper Chain by James Maxwell (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 5.99,
        quantity: 20,
        image: '/uploads/CopperChain-JamesMaxell.jpg'
    }),
    new Item({
        name: 'Cursed Command by Christopher G.Nuttal (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 7.50,
        quantity: 20,
        image: '/uploads/CursedCommand-ChristopherGNuttal.jpg'
    }),
    new Item({
        name: 'Departure by A.G.Riddle (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 6.99,
        quantity: 20,
        image: '/uploads/Departure-A.G.Riddle.jpg'
    }),
    new Item({
        name: 'From a Distant Star by Karen M.Question (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 6.75,
        quantity: 20,
        image: '/uploads/FromADistantStar-KarenMQuestion.jpg'
    }),
    new Item({
        name: 'Gildans Mens Assorted Crew T-Shirt MultiPack',
        description: 'T-Shirt',
        store: 'Amazon',
        price: 15.99,
        quantity: 20,
        image: '/uploads/GildansMensAssortedCrewT-ShirtMultiPack.jpg'
    }),
    new Item({
        name: 'Halsey Street by Naima Coster (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 8.00,
        quantity: 20,
        image: '/uploads/halseyStreet.jpeg'
    }),
    new Item({
        name: 'HP Pavilion Laptop',
        description: 'Laptop',
        store: 'Amazon',
        price: 1299.99,
        quantity: 20,
        image: '/uploads/HPPavilion.jpg'
    }),
    new Item({
        name: 'IronWill by JamesMaxwell (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 7.85,
        quantity: 20,
        image: '/uploads/IronWill-JamesMaxwell.jpg'
    }),
    new Item({
        name: 'Jerzees Mens Spot Shield Short Sleeve Polo Sport Shirt',
        description: 'Shirt',
        store: 'Amazon',
        price: 16.99,
        quantity: 20,
        image: '/uploads/JerzeesMensSpotShieldShortSleevePoloSportShirt.jpg'
    }),
    new Item({
        name: 'LARACE Women Short Sleeves Flare Tunic Tops Flowy Shirt',
        description: 'Shirt',
        store: 'Amazon',
        price: 17.50,
        quantity: 20,
        image: '/uploads/LARACEWomenShortSleevesFlareTunicTopsFlowyShirt.jpg'
    }),
    new Item({
        name: 'LEE Womens Relaxed Fit Straight Leg Jeans',
        description: 'Jeans',
        store: 'Amazon',
        price: 10.99,
        quantity: 20,
        image: '/uploads/LEEWomensRelaxedFitStraightLegJeans.jpg'
    }),
    new Item({
        name: 'LG Q6 (US700) Smart Phone (Mobile)',
        description: 'Smart Phone',
        store: 'Amazon',
        price: 1115.99,
        quantity: 20,
        image: '/uploads/LGQ6US700.jpg'
    }),
    new Item({
        name: 'Neleus Mens Dry Fit Mesh Atheletic Shirts',
        description: 'Shirt',
        store: 'Amazon',
        price: 14.99,
        quantity: 20,
        image: '/uploads/NeleusMensDryFitMeshAtheleticShirts.jpg'
    }),
    new Item({
        name: 'NYD Women\'s Marilyn Straight Leg Denim Jeans',
        description: 'Shirt',
        store: 'Amazon',
        price: 20.99,
        quantity: 20,
        image: '/uploads/NYDWomen\'sMarilynStraightLegDenimJeans.jpg'
    }),
    new Item({
        name: 'Samsung Galaxy A10 Smart Phone',
        description: 'Smart Phone',
        store: 'Amazon',
        price: 1050.99,
        quantity: 20,
        image: '/uploads/SamsungGalaxyA10.jpg'
    }),
    new Item({
        name: 'The Atlantis World by A.G.Riddle (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 7.99,
        quantity: 20,
        image: '/uploads/TheAtlantisWorld-A.G.Riddle.jpg'
    }),
    new Item({
        name: 'The Book Of The Unwinding - JDHorn (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 6.99,
        quantity: 20,
        image: '/uploads/TheBookOfTheUnwinding-JDHorn.jpg'
    }),
    new Item({
        name: 'The Einstein Prophecy (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 7.98,
        quantity: 20,
        image: '/uploads/TheEinsteinProphecy.jpeg'
    }),
    new Item({
        name: 'The Man Of Legends Kenneth Johnson (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 10.99,
        quantity: 20,
        image: '/uploads/TheManOfLegendsKennethJohnson.jpeg'
    }),
    new Item({
        name: 'The Night Crossing by Robert Masello (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 5.98,
        quantity: 20,
        image: '/uploads/TheNightCrossing-RobertMasello.jpg'
    }),
    new Item({
        name: 'The Road Beyond Ruin (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 7.80,
        quantity: 20,
        image: '/uploads/TheRoadBeyondRuin.jpeg'
    }),
    new Item({
        name: 'Winter World by A.G.Riddle (Book)',
        description: 'Book',
        store: 'Amazon',
        price: 7.75,
        quantity: 20,
        image: '/uploads/WinterWorld-A.G.Riddle.jpg'
    }),
    new Item({
        name: 'Womens Linen T-Shirt with Rolled Sleeves',
        description: 'Shirt',
        store: 'Amazon',
        price: 16.75,
        quantity: 20,
        image: '/uploads/WomensLinenT-ShirtwithRolledSleeves.jpg'
    }),
    new Item({
        name: 'Women T-Shirt with Floral Print',
        description: 'T-Shirt',
        store: 'Amazon',
        price: 15.67,
        quantity: 20,
        image: '/uploads/WomenT-ShirtWithFloralPrint.jpg'
    }),
    new Item({
        name: 'Wrangler Authentics Men\'s Classic Relaxed Fit Flex Jeans',
        description: 'Jeans',
        store: 'Amazon',
        price: 10.50,
        quantity: 20,
        image: '/uploads/WranglerAuthenticsMen\'sClassicRelaxedFitFlexJeansJeans.jpg'
    }),
    new Item({
        name: 'Xiaomi Redmi Note 6 Pro 64GB Dual Camera Smart Phone (Mobile)',
        description: 'Mobile',
        store: 'Amazon',
        price: 1300.99,
        quantity: 20,
        image: '/uploads/XiaomiRedmiNote6Pro64GBDualCamera.jpg'
    })
]

var done = 0
for(var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++
        if(done === products.length) {
            exit()
        }
    })
}

function exit() {
    mongoose.disconnect()
}