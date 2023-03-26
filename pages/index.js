import { Fragment, useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from 'mongodb'
import Head from "next/head";
const DUMMY_MEETUPS = [
  {
    id: "M1",
    title: "First meet up",
    image:
      "https://img.freepik.com/free-photo/little-white-church-with-red-roof-reyniskyrka-vik-iceland_181624-14089.jpg?w=2000&t=st=1675616723~exp=1675617323~hmac=5042574a8fe8aafa2ae7f65601303e0157cd9dd2e613dfc7b17ed82809b2d89b",
    address: "san francisko",
    description: 'this is first meet up jaja'
  },
  {
    id: "M2",
    title: "second meet up",
    image:
      "https://img.freepik.com/free-photo/little-white-church-with-red-roof-reyniskyrka-vik-iceland_181624-14089.jpg?w=2000&t=st=1675616723~exp=1675617323~hmac=5042574a8fe8aafa2ae7f65601303e0157cd9dd2e613dfc7b17ed82809b2d89b",
    address: "san francisko",
    description: 'this is second meet up jaja'
  },
];
function HomePage(props) {

 
  return <Fragment><Head>
    <title>Meetups</title>
    <meta name="description" content="Browse list of some popular meetups"  />
    </Head><MeetupList meetups={props.meetups} /></Fragment>;
}

// only page components, runs during build process
export async function getStaticProps(){

  // fetch data from api, read file from database



  const client = await   MongoClient.connect('mongodb+srv://kakha:koimbra10@clusterreeducate.mquvn.mongodb.net/meetups?retryWrites=true&w=majority')
     
  const db = client.db()


  const meetupCollection =  db.collection('meetups')

  
 const meetups = await meetupCollection.find().toArray()

  return {
    props: { // it will be a props for this page component mmm
      meetups: meetups.map(meetup=> ({
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString()
      })),
      revalidate: 10, // checks for changes on this time interval

    }
  }

}


// runs during server after deployment 
// export async function getServerSideProps(context){

//   const req = context.req;
//   const res= context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }

// }

export default HomePage;
