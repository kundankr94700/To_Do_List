import React, { useState } from 'react'
import axios from 'axios'

function ToDoPractice() {
    const [events, setEvents] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [list, addList] = useState([])
    const [completedlist, addcompletedList] = useState([])


    const handler = (e) => {
        e.preventDefault();
        if(events && date && time)
        {const event = { id: new Date().getTime().toString(), events, date,time }
        addList(list => { return [...list, event] })
        console.log(list);}
        else{
            alert("Enter All Details First")
        }
        const promise=axios.post('http://localhost:4000/events',
        { name:events,id:new Date().getTime().toString() ,date:date,time:time},
            {       
            headers:{['contect-type']:'application/json' }
        }
        )
        promise.then(response=>{
            console.log(response);
        })
        promise.catch(e=>console.log(e))
        //console.log(b);
    }
const getEvents=()=>{
    alert('admnkjasnd')
    axios.get('http://localhost:4000/events').then(myevent=>{
        console.log(myevent)
        addList([...list,myevent['data']])
    })

}
    const removeEvent = (id) => {
        let eventList = list.filter(x => x.id !== id)
        let [deleted]=list.filter(x => x.id === id)
        addList(eventList)
        addcompletedList([...completedlist,{...deleted,id:new Date().getTime().toString()}])
        console.log(completedlist)
    }

    const RemoveHistory=(id)=>{
        let remove=completedlist.filter(x=>x.id!==id)
        addcompletedList(remove)
    }
    return (
        <>
            <article>
                <br></br>
                <img src='todo.jpg' width='400'></img>
                <form className='form' onSubmit={handler}>
                    <div className='form-control'>
                        <label htmlFor="To Do">To Do</label>
                        <input type='text' value={events} id='events' onChange={(e) => { setEvents(e.target.value) }}></input>

                    </div>
                    <div className='form-control'>
                        <label htmlFor="Time">Event Timing</label>
                        <input type='time' value={time} id='time' onChange={(e) => { setTime(e.target.value) }}></input>

                    </div>
                    <div className='form-control'>
                        <label htmlFor="Date">Event Date</label>
                        <input type='date' value={date}  id='date' onChange={(e) => { setDate(e.target.value) }}></input>

                    </div>
                    <button type='submit' className='btn'>Add Events</button><button type='button' className='btn' onClick={getEvents}>Refresh</button>

                </form>
                <h3 style={{border:'2px solid green'}}>To Do Task List </h3>
                {
                    list.map((x) => {
                        return (
                            <div className='item' style={{border:'2px solid green'}} key={x.id}>
                                <h3>{x.events}    </h3>
                                <h5>{x.date} {x.time} </h5>
                                <button className='btn' onClick={() => removeEvent(x.id)}>Remove</button>

                            </div>);
                    }
                    )
                }<br>
                </br>
                <br>
                </br>
                <h3 style={{border:'2px solid red'}}>Completed Task List </h3>
                {
                    completedlist.map((x) => {
                        return (
                            <div className='item' style={{border:'2px solid red'}} key={x.id}>
                                <h3>{x.events}    </h3>
                                <h5>{x.date} {x.time} </h5>
                                <button className='btn' onClick={() => RemoveHistory(x.id)}>Remove</button>

                            </div>);
                    }
                    )
                }

            </article>
        </>
    )
}

export default ToDoPractice
