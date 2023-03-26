
import { useRouter } from 'next/router'
import NewMetUpForm from '../../components/meetups/NewMeetupForm'


function NewMeetUpPage(){
    const router = useRouter()
   async function addMeetUpHandler(enteredMeetUpData){

      
        console.log(enteredMeetUpData)

       const response = await fetch('/api/new-meetup', {
        method: 'POST',
        body: JSON.stringify(enteredMeetUpData),
        headers: {
            'Content-Type': 'application/json'
        }
       })

       const data = response.json()

       console.log(data)

       router.push('/')


    }
    return  <NewMetUpForm onAddMeetup={addMeetUpHandler} />
}

export default NewMeetUpPage