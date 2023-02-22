import { useParams } from "react-router-dom";
import { useAuthState } from '../utilities/firebase';
import RecordCreateGame from './games/RecordCreateGame';
import RecordNovelForm from './novels/RecordNovelForm';
import CircularProgress from '@mui/material/CircularProgress';


function RecordCreateWithType() {
    const { typeId } = useParams();
    const [user] = useAuthState();

    if (typeId == 1) {
        return (
            <RecordCreateGame />
        );
    } else if (typeId == 2) {
        return (
            <div>
                {
                    user ? <RecordNovelForm user={user} mode="Create" /> : <div><CircularProgress color="inherit" /></div>
                }
            </div>
        );
    } else {
        return (
            <div>
                hi3
            </div>
        );
    }
}

export default RecordCreateWithType;
