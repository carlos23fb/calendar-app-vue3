import {reactive} from 'vue'
import {seedData} from './seed.js'

export const store = {
    state:{
        data: reactive(seedData)
    },
    getActiveDay(){
        return this.state.data.find((day) => day.active)
    },
    setActiveDay(dayId){
        this.state.data.map((dayObj) => {
            dayObj.id === dayId ? dayObj.active = true : dayObj.active 
            =false;
        });
    },
    submitEvent(eventDetails){
        const activeDay = this.getActiveDay();
        activeDay.events.push({"details": eventDetails, "edit": false})
    },

    // • Filter state data , based on day.id , to get the day that the event is being edited.
    // • Filter the events array of the targeted day, based on event.details , to get the targeted event.
    editEvent(dayId, eventDetails){
        this.resetEditOfAllEvents()
        const dayObj = this.state.data.find((day) => day.id === dayId);
        const eventObj = dayObj.events.find((event) => event.details === eventDetails);
        eventObj.edit = true;
    },
    resetEditOfAllEvents(){
        this.state.data.map((dayObj) =>{
            dayObj.events.map(event =>{
                event.edit = false;
            })
        })
    }
}