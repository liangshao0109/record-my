import { useAuthState } from '../utilities/firebase';
import RecordCreateNovelForm from './RecordCreateNovelForm';
import CircularProgress from '@mui/material/CircularProgress';


function RecordCreateNovel() {
    const [user] = useAuthState();

    return (
        <div>
            {
                user ? <RecordCreateNovelForm user={user} /> : <div><CircularProgress color="inherit" /></div>
            }
        </div>
    );
}

export default RecordCreateNovel;
