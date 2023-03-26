import { MongoClient, ObjectId } from 'mongodb'
import MeetUpDetail from '../../components/meetups/MeetupDetail'
import { img_url } from '../../styles/global'

function meetUpDetails (props){
    return <MeetUpDetail image={props.meetupData?.image} title={props.meetupData?.title} address={props.meetupData?.address} description={props.meetupData?.description} />
}



export async function getStaticPaths (){

    const client = await   MongoClient.connect('mongodb+srv://kakha:koimbra10@clusterreeducate.mquvn.mongodb.net/meetups?retryWrites=true&w=majority')
     
const db = client.db()


const meetupCollection = db.collection('meetups')


const meetups = await meetupCollection.find({}, {_id: 1}).toArray()
client.close()
    return {
        fallback: false,
        paths: meetups.map(meetup=> ({
            params: {meetupId: meetup._id.toString()}
        })),
    }
}


export async function getStaticProps(context){
    console.log('dsdsd')
    
    const meetupId = context.params.meetupId
// fetch data for single meetup

const client = await   MongoClient.connect('mongodb+srv://kakha:koimbra10@clusterreeducate.mquvn.mongodb.net/meetups?retryWrites=true&w=majority')
     
const db = client.db()


const meetupCollection = db.collection('meetups')


const selectedMeetup = await meetupCollection.findOne({_id: new ObjectId(meetupId)})
 console.log(selectedMeetup)
 client.close()
    return {
        props: {
            meetupData: {
                title: selectedMeetup?.title,
                image: selectedMeetup?.image,
                description: selectedMeetup?.description,
                id: selectedMeetup._id?.toString()
            }
        },
        
    }
}

export default meetUpDetails