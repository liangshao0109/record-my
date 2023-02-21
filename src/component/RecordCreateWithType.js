import {useParams} from "react-router-dom";
import RecordCreateGame from './RecordCreateGame';
import RecordCreateNovel from './RecordCreateNovel';

function RecordCreateWithType() {
    const {typeId} = useParams()

    if (typeId == 1){
        return (
            <RecordCreateGame />
        );
    }else if(typeId == 2){
        return (
            <RecordCreateNovel />
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
