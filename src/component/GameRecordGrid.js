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

function GameRecordGrid(data) {
    const [games, error] = useDbData(`/${data.user.uid}/games`);
    const [update, result] = useDbUpdate(`/${data.user.uid}`);

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (games === undefined) return <div><CircularProgress color="inherit" /></div>;
    if (!games) return <div className='no-record-text'>No game records found, please click the add button on the bottom right corner to add records.</div>;

    console.log(games);

    const sortedGameRecords = games.sort((a, b) => b.updated_at - a.updated_at);
    
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

    const deleteGameRecordById = (id) => {
        const newGameList = games.filter( game => game.id != id)

        update({
            "games": newGameList
        });

    }

    const editGameRecordById = (id) => {
        window.location.href = `/record/1/edit/${id}`
    }


    return (
        <div className="game-record-list">
            <Grid container spacing={1} className="list-grid">
                {sortedGameRecords.map((game) => {
                    console.log(game);
                    return (
                        <Grid item xs={12} sm={6} key={game.id} className="grid-item">
                            <Card className='grid-card'>
                                <CardMedia
                                    component="img"
                                    alt={game.name}
                                    className="card-image-url"
                                    image={game.image_url}
                                />
                                <Box className="card-box">
                                    <CardContent className="card-content">
                                        <div className='card-game-name'>
                                            {game.name}
                                        </div>
                                        <Divider />
                                        <div className='status-list'>
                                            <div className='status'>
                                                Bought {game.bought ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                                            </div>
                                            <div className='status'>
                                                Played {game.played ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                                            </div>
                                            <div className='status'>
                                                Completed {game.completed ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                                            </div>
                                        </div>
                                        <ThemeProvider theme={theme}>
                                            <CardNote note={game.note} />
                                            
                                            <div className='card-btn-list'>
                                                <Button size="small" color="blue" className='card-btn' onClick={() => editGameRecordById(game.id)}>
                                                    <EditIcon fontSize="small" />
                                                </Button>
                                                <Button size="small" color="red" className='card-btn' onClick={() => deleteGameRecordById(game.id)}>
                                                    <DeleteIcon fontSize="small" />
                                                </Button>
                                            </div>
                                        </ThemeProvider>

                                    </CardContent>
                                </Box>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}

export default GameRecordGrid;
