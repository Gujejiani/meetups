// api/new-meetup
import {MongoClient} from 'mongodb'


async function handler(req, res){
    console.log('it works')

 if(req.method ==='POST'){
    console.log('post request')

    try{
        const data = req.body;
        const {title, image, address, description} = data
    
    
       const client = await   MongoClient.connect('mongodb+srv://kakha:koimbra10@clusterreeducate.mquvn.mongodb.net/meetups?retryWrites=true&w=majority')
     
        const db = client.db()
    
    
        const meetupCollection = db.collection('meetups')
    
       const result = await meetupCollection.insertOne({
            title,
            image,
            address,
            description
        })
    
        console.log(result)
        client.close()


         res.status(201).json({
            message: "success"
        })

    }catch(err){
        console.log(err)
    }

}
}

export default handler