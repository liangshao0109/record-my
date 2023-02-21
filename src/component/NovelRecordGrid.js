import './RecordView.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useDbData, useDbUpdate } from "../utilities/firebase";
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import CardNote from './CardNote';

function NovelRecordGrid(data) {
    const [novels, error] = useDbData(`/${data.user.uid}/novels`);
    const [update, result] = useDbUpdate(`/${data.user.uid}`);

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (novels === undefined) return <div><CircularProgress color="inherit" /></div>;
    if (!novels) return <div className='no-record-text'>No novel records found, please click the add button on the bottom right corner to add records.</div>;

    console.log(novels);

    const sortedNovelRecords = novels.sort((a, b) => b.updated_at - a.updated_at);
    
    const theme = createTheme({
        palette: {
            blue: {
                main: '#50717b',
                dark: '#fff',
            },
            red: {
                main: '#c46352',
                dark: '#fff'
            }
        },
    });

    const deleteNovelRecordById = (id) => {
        const newNovelList = novels.filter( novel => novel.id != id)

        update({
            "novels": newNovelList
        });

    }

    const editNovelRecordById = (id) => {
        window.location.href = `/record/2/edit/${id}`;
    }

    const handleClickURL = (url) => {
        window.location.href = url;
    }

    return (
        <div className="novel-record-list">
            <Grid container spacing={1} className="list-grid">
                {sortedNovelRecords.map((novel) => {
                    console.log(novel);
                    return (
                        <Grid item xs={12} sm={6} key={novel.id} className="grid-item">
                            <Card className='grid-card'>
                                <CardContent className="card-content">
                                        <div className='card-novel-name'>
                                            {novel.name}
                                        </div>
                                        <Divider />
                                        <div className='status-list'>
                                            <div className='status'>
                                                Completed {novel.completed ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                                            </div>
                                        </div>
                                        <div className='card-latest-chapter'>
                                            Latest chapter you read: {novel.latest_chapter}
                                        </div>
                                        <ThemeProvider theme={theme}>
                                            <div>
                                                <Button size="small" color="blue" className='card-btn' onClick={() => handleClickURL(novel.url)}>Link to the novel</Button>
                                            </div>

                                            <CardNote note={novel.note} />
                                            
                                            <div className='card-btn-list'>
                                                <Button size="small" color="blue" className='card-btn' onClick={() => editNovelRecordById(novel.id)}>
                                                    <EditIcon fontSize="small" />
                                                </Button>
                                                <Button size="small" color="red" className='card-btn' onClick={() => deleteNovelRecordById(novel.id)}>
                                                    <DeleteIcon fontSize="small" />
                                                </Button>
                                            </div>
                                        </ThemeProvider>

                                    </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}

export default NovelRecordGrid;
