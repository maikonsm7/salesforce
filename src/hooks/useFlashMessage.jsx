import bus from "../helpers/bus";

export default function useFlashMessage(){
    function setFlashMessage(msg, type){
        bus.emit('flash', {
            message: msg,
            type
        })
    }

    return {setFlashMessage}
}