import { useParams } from "react-router-dom";
import { useAuthState } from '../utilities/firebase';
import CircularProgress from '@mui/material/CircularProgress';
import RecordEditGameForm from './RecordEditGameForm';
import RecordEditNovelForm from './RecordEditNovelForm';

function RecordEdit() {
    const { typeId } = useParams()
    const { id } = useParams()
    const [user] = useAuthState();

    if (typeId == 1) {
        return (
            <div>
                {
                    user ? <RecordEditGameForm id={id} user={user} /> : <div><CircularProgress color="inherit" /></div>
                }
            </div>
        );
    } else if (typeId == 2) {
        return (
            <div>
                {
                    user ? <RecordEditNovelForm id={id} user={user} /> : <div><CircularProgress color="inherit" /></div>
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
