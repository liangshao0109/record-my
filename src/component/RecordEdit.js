import { useParams } from "react-router-dom";
import { useAuthState } from '../utilities/firebase';
import CircularProgress from '@mui/material/CircularProgress';
import RecordGameForm from './games/RecordGameForm';
import RecordNovelForm from './novels/RecordNovelForm';

function RecordEdit() {
    const { typeId } = useParams()
    const { id } = useParams()
    const [user] = useAuthState();

    if (typeId == 1) {
        return (
            <div>
                {
                    user ? <RecordGameForm id={id} user={user} mode="Edit" /> : <div><CircularProgress color="inherit" /></div>
                }
            </div>
        );
    } else if (typeId == 2) {
        return (
            <div>
                {
                    user ? <RecordNovelForm id={id} user={user} mode="Edit" /> : <div><CircularProgress color="inherit" /></div>
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

export default RecordEdit;
