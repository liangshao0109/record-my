import {useParams} from "react-router-dom";
import RecordCreateGame from './RecordCreateGame'

function RecordCreateWithType() {
    const {typeId} = useParams()

    if (typeId == 1){
        return (
            <RecordCreateGame />
        );
    }else if(typeId == 2){
        return (
            <div>
                hi2
            </div>
        );
    }else{
        return (
            <div>
                hi3
            </div>
        );
    }
}

export default RecordCreateWithType;
